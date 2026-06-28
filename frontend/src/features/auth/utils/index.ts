import { axios, setAxiosDefaultToken, setAxiosInterceptors, tokenStorage } from "../../../shared/configs/axios";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../../shared/types/Ijwt";

// Decode JWT payload and extract claims
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const setAuthToken = () => {
  const { getToken } = tokenStorage;
  const tokenDetail = getToken();
  const token = tokenDetail?.token;

  if (token && token.access_token) {
    setAxiosDefaultToken(token.access_token, axios);
    setAxiosInterceptors(axios);
  }
};