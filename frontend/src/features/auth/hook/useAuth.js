import { setUser, setError, setLoading } from "../state/auth.slice";
import { register } from "../service/auth.api";
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
    try {
      const data = await register({
        email,
        password,
        fullname,
        isSeller,
        contact,
      });
      dispatch(setUser(data.user));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
};
