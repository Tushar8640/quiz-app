import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtVerify } from "./jwtVerify";
import { userLoggedIn, userLoggedOut } from "../app/features/auth/authSlice";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const jwtExpired = jwtVerify();
    if (jwtExpired) {
      dispatch(userLoggedOut());
      localStorage.removeItem("auth");
    } else {
      const auth = JSON.parse(localStorage.getItem("auth"));
      dispatch(
        userLoggedIn({ accessToken: auth?.accessToken, user: auth?.user })
      );
    }
    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};
