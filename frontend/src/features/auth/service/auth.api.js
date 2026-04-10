import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/auth",
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
