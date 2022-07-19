import axios from "axios";

const sendMail = alert => {
  return axios.post('api/nodemailer/mail', alert)
  .then(res => {
    return res.data;
  });
}

export default sendMail