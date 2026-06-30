import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, clearAuth } from "../utils/authSlice";

const YT_SCOPE = "https://www.googleapis.com/auth/youtube.force-ssl";

const useAuth = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((store) => store.auth);

  const login = useGoogleLogin({
    scope: `openid email profile ${YT_SCOPE}`,
    onSuccess: async (token) => {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token.access_token}` },
      });
      const p = await res.json();
      dispatch(
        setAuth({
          accessToken: token.access_token,
          user: { name: p.name, picture: p.picture },
        }),
      );
    },
    onError: () => console.error("Google login failed"),
  });

  const logout = () => {
    googleLogout();
    dispatch(clearAuth());
  };

  return { login, logout, accessToken, user, isSignedIn: !!accessToken };
};

export default useAuth;
