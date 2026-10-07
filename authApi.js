import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001" });

export const getUserById = (id) => api.get(`/users/${id}`).then((r) => r.data);
export const getUserByEmail = (email) => api.get(`/users?email=${email}`).then((r) => r.data[0]);
export const getUserByUsername = (username) => api.get(`/users?username=${username}`).then((r) => r.data[0]);
export const createUser = (data) => api.post("/users", data).then((r) => r.data);