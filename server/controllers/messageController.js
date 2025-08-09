const processed_messages = require('../models/Message');
const io = require('../server');


exports.insertMessage = async (req, res) => {
  try {
    const { wa_id, name, number, message, status, timestamp, meta_msg_id } = req.body;

    const exists = await processed_messages.findOne({ meta_msg_id });
    if (exists)   return res.status(200).json({ message: "Message already exists", existing: exists });
    
    const newMsg = await processed_messages.create({
      wa_id,
      name,
      number,
      status,
      message,
      timestamp,
      meta_msg_id,
    });

    io.emit('newMessage', newMsg);

    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { meta_msg_id, status } = req.body;

    const updated = await processed_messages.findOneAndUpdate(
      { meta_msg_id },
      { status },
      { new: true }
    );
    io.emit('statusUpdate', updated);

    if (!updated) return res.status(404).json({ message: "Message not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const users = await processed_messages.aggregate([
      {
        $group: {
          _id: '$wa_id',
          name: { $first: '$name' },
          message: {$first: '$message'}
        }
      },
      {
        $project: {
          _id: 0,
          wa_id: '$_id',
          name: 1,
          message: 1
        }
      }
    ]);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessagesByWaId = async (req, res) => {
  try {
    const { wa_id } = req.params;

    const messages = await processed_messages.find({ wa_id }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

