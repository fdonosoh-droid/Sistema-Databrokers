import axios from "axios";
import API_BASE_URL from "./config";

export const getMetrics = async () => {
  const res = await axios.get(`${API_BASE_URL}/metrics/`);
  return res.data;
};
export const createMetric = async (metric) => {
  const res = await axios.post(`${API_BASE_URL}/metrics/`, metric);
  return res.data;
};
