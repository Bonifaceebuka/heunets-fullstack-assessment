export interface AuthToken {
  access_token?: string;
  refresh_token?: string;
}

export interface DecodedToken {
  exp?: number;
  [key: string]: any;
}
