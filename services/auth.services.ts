import apiClient from "@/lib/apiClient";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post("/auth/sign-up", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await apiClient.post("/auth/sign-in", data);
  return response.data;
};
