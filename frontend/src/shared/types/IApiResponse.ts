export interface IApiResponse<T> {
  status_code: number;
  message: string;
  data?: T;
}

export interface ApiError {
  message: string;
  status: number;
}