const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  wa_id: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  number: { type: String, required: true }, 
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  meta_msg_id: { type: String, required: true },       
});

module.exports = mongoose.model('processed_messages', messageSchema);
