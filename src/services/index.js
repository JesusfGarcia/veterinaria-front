import axios from "axios";

export default function apiConsumer({ url, data, method }) {
  return axios({
    baseURL: "http://localhost:5050/api/v1",
    url,
    data,
    method,
  });
}
