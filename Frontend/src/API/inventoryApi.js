
import axios from "axios";

const BASE_URL = "https://inventory-management-system-mez0.onrender.com";



//  Get API
export const getItems = () => axios.get(`${BASE_URL}/items`);

//  Get single item API
export const getItem = (id) => axios.get(`${BASE_URL}/items/${id}`);

// Get image API
export const getItemImageUrl = (id) => `${BASE_URL}/items/${id}/image`;

//  Post API
export const createItem = (formData) =>
  axios.post(`${BASE_URL}/items`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Update API
export const updateItem = (id, formData) =>
  axios.put(`${BASE_URL}/items/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Delete API
export const deleteItem = (id) => axios.delete(`${BASE_URL}/items/${id}`);
