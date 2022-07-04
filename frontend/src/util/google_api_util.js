import axios from "axios";

export const getGoogleKey = () => {
  axios
    .get("http://localhost:5001/api/google/")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};


// useless now unless someone wants to try this again!