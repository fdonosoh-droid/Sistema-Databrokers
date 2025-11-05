import axios from "axios";
import API_BASE_URL from "./config";

export const getLeads = async () => {
  const res = await axios.get(`${API_BASE_URL}/leads/`);
  return res.data;
};

export const createLead = async (lead) => {
  const res = await axios.post(`${API_BASE_URL}/leads/`, lead);
  return res.data;
};
