import { setUser, setError, setLoading } from "../state/auth.slice";
import { register, login, logout } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegisterUser = async ({
    email,
    password,
    fullname,
    isSeller = false,
    contact,
  }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await register({
        email,
        password,
        fullname,
        isSeller,
        contact,
      });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLoginUser = async ({ email, password }) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogoutUser = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      await logout();
      dispatch(setUser(null));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegisterUser,
    handleLoginUser,
    handleLogoutUser,
  };
};
