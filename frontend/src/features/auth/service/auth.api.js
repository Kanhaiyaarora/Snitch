import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({
  email,
  password,
  fullname,
  isSeller,
  contact,
}) => {
  const response = await api.post("/register", {
    email,
    password,
    fullname,
    isSeller,
    contact,
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await api.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/me");
  return response.data;
};
