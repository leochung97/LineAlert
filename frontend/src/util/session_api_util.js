import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData) => {
  //will return token or error
  return axios.post("/api/users/register", userData);
};

export const login = (userData) => {
  //will return token or error
  return axios.post("/api/users/login", userData);
};

export const updateUser = user => {
  return axios.patch(`api/users/edit`, user)
  .then(res => {
    return res.data;
  });
}