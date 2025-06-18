import axios from "axios";
const API_URL = "http://localhost:3000/api/admin";

// ==================== USUARIOS ====================

export const getUsuarios = async () => {
  const res = await axios.get(`${API_URL}/usuarios`);
  return res.data;
};

export const updateUsuario = async (id, data) => {
  const res = await axios.put(`${API_URL}/usuarios/${id}`, data);
  return res.data;
};

export const deleteUsuario = async (id) => {
  const res = await axios.delete(`${API_URL}/usuarios/${id}`);
  return res.data;
};

// ==================== VEHICULOS ====================

export const getVehiculos = async () => {
  const res = await axios.get(`${API_URL}/vehiculos`);
  return res.data;
};

export const addVehiculo = async (data) => {
  const res = await axios.post(`${API_URL}/vehiculos`, data);
  return res.data;
};

export const updateVehiculo = async (id, data) => {
  const res = await axios.put(`${API_URL}/vehiculos/${id}`, data);
  return res.data;
};

export const deleteVehiculo = async (id) => {
  const res = await axios.delete(`${API_URL}/vehiculos/${id}`);
  return res.data;
};
