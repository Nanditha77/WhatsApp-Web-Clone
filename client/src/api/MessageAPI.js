import axios from 'axios';

const MessageAPI = () => {
  const getAllUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/messages');
    return res.data;
  };

  const getMessagesByWaId = async (wa_id) => {
    const res = await axios.get(`http://localhost:5000/api/messages/${wa_id}`);
    return res.data;
  };

  const sendMessage = async (data) => {
    const res = await axios.post('http://localhost:5000/api/messages/add', data);
    return res.data;
  };

  return {
    getAllUsers,
    getMessagesByWaId,
    sendMessage
  };
};

export default MessageAPI;
