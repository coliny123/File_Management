import axios from 'axios'

// export const fetchUserDataApi = async () => {
//     const Server_IP = process.env.REACT_APP_Server_IP;
//     console.log(axios.defaults.headers)
//     await axios.get(`${Server_IP}/users/files`)
//         .then((res) => {
//             console.log(res.data);
//             return res.data
//         })
//         .catch((err) => {
//             console.log(err);
//             if (err.response.status === 401 || err.response.status === 500) {
//                 throw err;
//             }
//         })
// }

// export default fetchUserDataApi

const fetchUserDataApi = async () => {
  const Server_IP = process.env.REACT_APP_Server_IP;
  try {
    // return await axios.get(`${Server_IP}/users/files`)
    const res = await axios.get(`${Server_IP}/users/files`)
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    if (err.response && (err.response.status === 401 || err.response.status === 500)) {
      throw err;
    }
  }
}

export default fetchUserDataApi;