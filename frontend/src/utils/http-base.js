import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token1"),
  },
});
