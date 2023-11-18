import axios from 'axios'

export const deleteFileApi = async (id) => {
  const Server_IP = process.env.REACT_APP_Server_IP;
  try {
    await axios.delete(`${Server_IP}/${id}`)
  } catch (err) {
    console.log(err);
    if (err.response && (err.response.status === 401 || err.response.status === 500)) {
      throw err;
    }
  }
}