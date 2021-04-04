import axios from "axios";

export default axios.create({
  baseURL: "https://coinpurse-app.herokuapp.com/api/",
});
