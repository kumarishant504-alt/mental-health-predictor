import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictMentalHealth = async (data) => {
  const response = await api.post("/api/predict", data);
  return response.data;
};

export const sendChatMessage = async (message, assessment) => {
  const response = await api.post("/api/chat", {
    message,
    assessment,
  });

  return response.data;
};

export default api;