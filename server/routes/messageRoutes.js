const express = require('express');
const router = express.Router();
const {
  insertMessage,
  updateMessageStatus,
  getAllMessages,
  getMessagesByWaId
} = require('../controllers/messageController');

router.post('/add', insertMessage);              
router.post('/status', updateMessageStatus);      
router.get('/', getAllMessages); 
router.get('/:wa_id', getMessagesByWaId);                  

module.exports = router;
