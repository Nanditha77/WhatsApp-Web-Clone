const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const processed_messages = require('../models/Message');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const payloadDir = path.join(__dirname, '../../payloads');

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4 
}).then(() => {
  console.log('MongoDB connected');
  console.log("Connected to DB:", mongoose.connection.name);
  processPayloads();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

async function processPayloads() {
  const files = fs.readdirSync(payloadDir);
  console.log("Found payload files:", files);

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(payloadDir, file), 'utf-8'));

    const entry = data.metaData?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    if (value?.messages) {
      for (const msg of value.messages) {
        const wa_id = value.contacts?.[0]?.wa_id;
        const name = value.contacts?.[0]?.profile?.name || 'Unknown';
        const number = value.contacts?.[0]?.wa_id;
        const message = msg.text?.body || '';
        const timestamp = new Date(parseInt(msg.timestamp) * 1000);
        const meta_msg_id = msg.id;

        try {
          const exists = await processed_messages.findOne({ meta_msg_id });
          if (!exists) {
          await processed_messages.create({
            wa_id,
            name,
            number,
            message,
            timestamp,
            meta_msg_id,
          });
        
          console.log(`Inserted message: ${meta_msg_id}`);
        }
        } catch (err) {
          console.error(`Failed to insert message ${meta_msg_id}:`, err.message);
        }
      }
    } else if (value?.statuses) {
      for (const status of value.statuses) {
        const meta_msg_id = status.id || status.meta?.meta_msg_id;
        const newStatus = status.status;

        try {
          const updated = await processed_messages.findOneAndUpdate(
            { meta_msg_id },
            { status: newStatus },
            { new: true }
          );

          if (updated) {
            console.log(`Updated message ${meta_msg_id} to status: ${newStatus}`);
          } else {
            console.log(`No message found for status update: ${meta_msg_id}`);
          }
        } catch (err) {
          console.error(`Failed to update status for ${meta_msg_id}:`, err.message);
        }
      }
    } else {
      console.log(`Skipping ${file} — No messages or statuses found`);
    }
  }

  console.log("All payloads processed.");
  mongoose.disconnect();
}
