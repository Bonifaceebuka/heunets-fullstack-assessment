import type { AuthToken, DecodedToken } from "../types/Ijwt";
import { jwtDecode } from "jwt-decode";

// Decode JWT and check if token has expired
export const isTokenExpired = (token: AuthToken | null): boolean => {
  if (!token || !token.access_token) {
    return true;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token.access_token);

    if (!decoded.exp) {
      return false;
    }

    // exp is in seconds, convert to milliseconds
    const expiresAt = decoded.exp * 1000;
    const now = new Date().getTime();

    return expiresAt < now;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};