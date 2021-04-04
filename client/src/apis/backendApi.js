import axios from "axios";

export default axios.create({
  baseURL: "http://coinpurse-app.herokuapp.com/api/",
});
