import axios from 'axios';

const MessageAPI = () => {
  const getAllUsers = async () => {
    const res = await axios.get('https://whatsapp-web-clone-backend-t53o.onrender.com/api/messages');
    return res.data;
  };

  const getMessagesByWaId = async (wa_id) => {
    const res = await axios.get(`https://whatsapp-web-clone-backend-t53o.onrender.com/api/messages/${wa_id}`);
    return res.data;
  };

  const sendMessage = async (data) => {
    const res = await axios.post('https://whatsapp-web-clone-backend-t53o.onrender.com/api/messages/add', data);
    return res.data;
  };

  return {
    getAllUsers,
    getMessagesByWaId,
    sendMessage
  };
};

export default MessageAPI;
