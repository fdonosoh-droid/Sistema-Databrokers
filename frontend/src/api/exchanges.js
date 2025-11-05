import axios from "axios";
import API_BASE_URL from "./config";

export const getExchanges = async () => {
  const res = await axios.get(`${API_BASE_URL}/exchanges/`);
  return res.data;
};
export const createExchange = async (exchange) => {
  const res = await axios.post(`${API_BASE_URL}/exchanges/`, exchange);
  return res.data;
};
