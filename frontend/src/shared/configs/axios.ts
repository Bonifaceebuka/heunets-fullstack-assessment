import Axios, { AxiosError } from "axios";
import { APP_CONFIGS } from "../configs";
import type { ApiError } from "../types/IApiResponse";
import type { AxiosInstance, AxiosResponse } from "axios"
import { isTokenExpired } from "../utils/jwt_token";
import type { AuthToken } from "../types/Ijwt";
const API_BASE_URL = APP_CONFIGS.API_BASE_URL;

const TOKEN_STORAGE_PREFIX = `${APP_CONFIGS.SITE_NAME}_`;

export const tokenStorage = {
  getToken: () => {
    if (typeof window !== "undefined") {
      const session = window.localStorage.getItem(
        `${TOKEN_STORAGE_PREFIX}TOKEN`,
      );

      if (session && session !== null && session !== "null") {
        try {
          const token = JSON.parse(session);

          // Check if token is expired
          if (isTokenExpired(token)) {
            // Clear expired token
            window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
            deleteAxiosDefaultToken();
            return {
              token: null,
              isAuthenticated: false,
              isLoading: false,
            };
          }

          return {
            token,
            isAuthenticated: true,
            isLoading: false,
          };
        } catch (error) {
          console.error("Error parsing stored token:", error);
          window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
          return {
            token: null,
            isAuthenticated: false,
            isLoading: false,
          };
        }
      } else {
        return {
          token: null,
          isAuthenticated: false,
          isLoading: false,
        };
      }
    }
  },

  setToken: (token: AuthToken) => {
    window.localStorage.setItem(
      `${TOKEN_STORAGE_PREFIX}TOKEN`,
      JSON.stringify(token),
    );
  },

  clearToken: () => {
    window.localStorage.removeItem(`${TOKEN_STORAGE_PREFIX}TOKEN`);
    deleteAxiosDefaultToken();
  },
};


export const axios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  validateStatus: (status: number) => {
    const allowedStatuses = [200, 400, 403, 201];
    return allowedStatuses.includes(status);
  },
});

export const setAxiosDefaultToken = (
  token: string | null | undefined,
  axiosInstance: AxiosInstance,
) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  const { clearToken } = tokenStorage;

  axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => {
      const status = response?.status ?? 0;

    if ([401, 403].includes(status)) {
        clearToken();
        // Redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(response);
      }

      return response;
    },
    (error: AxiosError<ApiError>) => {
      const status = error?.response?.status ?? 0;
      const message = error?.response?.data?.message ?? "";

      // Handle token expiration (401 Unauthorized) or access denied (403 Forbidden)
      if ([401, 403].includes(status)) {
        clearToken();
        // Redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      // Handle unauthenticated or unauthorized messages
      if (message === "Unauthenticated." || message === "Unauthorized") {
        clearToken();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};

export const deleteAxiosDefaultToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

axios.interceptors.request.use(
  function (config) {
    // Dynamically set headers based on the request type

    if (config.method === "post") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (config.method === "put") {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (config.method === "get") {
      config.headers["Content-Type"] = "application/json";
    }

    // Always return the modified config
    return config;
  },
  function (error) {
    // Handle request error here
    return Promise.reject(error);
  },
);
