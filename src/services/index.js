import axios from "axios";

export default function apiConsumer({ url, data, method }) {
  const token = localStorage.getItem("token");
  return axios({
    baseURL: `${process.env.REACT_APP_URL}/api/v1`,
    url,
    data,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
