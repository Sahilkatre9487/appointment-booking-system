import axios from "axios";

const API_URL = "http://localhost:8080";

export const getAllServices = () => {
  return axios.get(`${API_URL}/services/public`);
};

export const bookAppointment = (appointment) => {
  return axios.post(`${API_URL}/appointments`, appointment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getMyAppointments = () => {
  return axios.get(`${API_URL}/appointments/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAllAppointments = () => {
  return axios.get(`${API_URL}/appointments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const approveAppointment = (id) => {
  return axios.put(
    `${API_URL}/appointments/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const cancelAppointment = (id) => {
  return axios.put(
    `${API_URL}/appointments/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const getDashboardStats = () => {
  return axios.get(`${API_URL}/appointments/dashboard`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const getAppointmentsByStatus = (status) => {
  return axios.get(
    `${API_URL}/appointments/status/${status}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const getAppointmentsByDate = (date) => {
  return axios.get(`${API_URL}/appointments/date/${date}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAppointmentsPage = (page, size, sortBy) => {
  return axios.get(
    `${API_URL}/appointments/page?page=${page}&size=${size}&sortBy=${sortBy}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getAppointmentsByService = (serviceName) => {
  return axios.get(
    `${API_URL}/appointments/service/${serviceName}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const deleteAppointment = (id) => {
  return axios.delete(`${API_URL}/appointments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const updateAppointment = (id, appointment) => {
  return axios.put(
    `${API_URL}/appointments/${id}`,
    appointment,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const exportAppointmentsToExcel = () => {
  return axios.get(
    `${API_URL}/appointments/export/excel`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const exportAppointmentsToPdf = () => {
  return axios.get(
    `${API_URL}/appointments/export/pdf`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

















