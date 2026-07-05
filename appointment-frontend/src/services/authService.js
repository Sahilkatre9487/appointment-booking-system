import axios from "axios";

const AUTH_URL = "http://localhost:8080/auth";
const PROVIDER_URL = "http://localhost:8080/providers";

// =======================
// Login
// =======================
export const login = (data) => {
  return axios.post(`${AUTH_URL}/login`, data);
};

// =======================
// Customer Registration
// =======================
export const registerCustomer = (data) => {
  return axios.post(`${AUTH_URL}/register`, data);
};

// =======================
// Provider Registration
// =======================
export const registerProvider = (data) => {
  return axios.post(`${PROVIDER_URL}/register`, data);
};