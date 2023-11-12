import axios from 'axios'

export const fetchUserDataApi = async () => {
    const Server_IP = process.env.REACT_APP_Server_IP;
    await axios.get(`${Server_IP}/users/files`)
        .then((res) => {
            console.log(res.data);
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export default fetchUserDataApi