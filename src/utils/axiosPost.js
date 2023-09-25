import axios from "axios";

async function axiosPost(url, data) {
    const baseurl = 'https://127.0.0.1:7001/';
    try {
        let res = await axios.post(baseurl + url, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                },
                withCredentials: true
            });
        return res;
    }
    catch (err) {
        console.log('错误' + err);
        return err;
    }
}
export default axiosPost
