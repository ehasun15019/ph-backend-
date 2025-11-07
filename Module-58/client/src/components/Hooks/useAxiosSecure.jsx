import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const requestInterceptors = instance.interceptors.request.use((config) => {
      console.log(config);

      const token = user.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    });

    // response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;

        if (status === 401 || status === 403) {
          console.log("signOut user");
          signOutUser().then(() => {
            // navigate to login
            navigate("/register");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptors);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;
