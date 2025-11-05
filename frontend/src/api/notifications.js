import axios from "axios";
import API_BASE_URL from "./config";

export const getNotifications = async () => {
  const res = await axios.get(`${API_BASE_URL}/notifications/`);
  return res.data;
};
export const createNotification = async (notification) => {
  const res = await axios.post(`${API_BASE_URL}/notifications/`, notification);
  return res.data;
};
