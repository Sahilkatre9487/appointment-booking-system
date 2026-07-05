import axios from "axios";

const API_URL = "http://localhost:8080/providers";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getPendingProviders = () => {
    return axios.get(
        `${API_URL}/pending`,
        authHeader()
    );
};

export const approveProvider = (id) => {
    return axios.put(
        `${API_URL}/${id}/approve`,
        {},
        authHeader()
    );
};

export const rejectProvider = (id) => {
    return axios.put(
        `${API_URL}/${id}/reject`,
        {},
        authHeader()
    );
};

export const getApprovedProviders = () => {
    return axios.get(
        `${API_URL}/approved`
    );
};