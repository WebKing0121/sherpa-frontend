import axiosInstance from '../../axiosConfig';

export const fetchMessages = id =>
  axiosInstance
    .get(`/prospects/${id}/messages/`)
    .then(({ data }) => data)
    .catch(console.log);

export const sendMessage = (id, body) => axiosInstance.post(`/prospects/${id}/send_message/`, body);
