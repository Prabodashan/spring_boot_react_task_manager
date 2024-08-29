// Inbuilt components and modules
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Third-party components and modules
import axios from "axios";

// Axios instance
import { axiosInstance } from "../libraries/axios";

// Custom components and modules
import UseAuth from "./UseAuth";

// Custom hook for API calls with request cancellation and interceptors
const useAxios = () => {
  //Api call loading state
  const [loading, setLoading] = useState(false);

  //Auth context
  const { setAuth } = UseAuth();

  //Navigate and Location hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set up request and response interceptors
  axiosInstance.interceptors.request.use(
    (config) => {
      // Log or modify request here
      return config;
    },
    (error) => {
      // Handle request error here
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // Log or modify response here
      return response;
    },
    async (error) => {
      // Handle response error here
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      // Cancel the request when the component unmounts
      source.cancel("Component unmounted: Request cancelled.");
    };
  }, []);

  // Making the API call with cancellation support
  const fetchData = async ({
    url,
    method,
    data = {},
    params = {},
    requestConfig = {},
  }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data: method.toLowerCase() === "get" ? undefined : data, // Only include data for non-GET requests
        params: method.toLowerCase() === "get" ? data : params, // For GET requests, use data as query params
        headers: requestConfig,
        cancelToken: axios.CancelToken.source().token,
      });

      return result.data;
    } catch (error) {
      if (!error?.response) {
        navigate("/error", { replace: true });
        return;
      }

      if (error.status === 403) {
        setAuth({});
        navigate(from, { replace: true });
      }

      return error.response.data;
    } finally {
      setLoading(false);
    }
  };

  // Expose the state and the fetchData function
  return { loading, fetchData };
};

export default useAxios;
