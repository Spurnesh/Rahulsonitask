import axios from "axios";

const api = axios.create({
  baseURL: "https://taskbackend1.herokuapp.com/api/v1",
});

export const createForm = (data) => api.post("/form", data);
