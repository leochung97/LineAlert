import axios from "axios";

export const getGoogleKey = () => {
  axios
    .get("http://localhost:5001/api/google/")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
