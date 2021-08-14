import axios from "axios"

const URL = 'http://localhost:3001/api'

const RequestApi = ({ method, url, data = "", baseURL}) => {
  let head = {
    ...data.headers,
  };
//console.log(URL, head)
  return axios({
    baseURL: baseURL || URL,
    method: method,
    url: url,
    data: data.data || "",
    headers: head || "",
    params: data.params || "",
    timeout: data.timeout || 3000,
    'axios-retry': {
      retries: 0
    }
  });
}

export default RequestApi