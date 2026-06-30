import type { FormState } from "../../../shared/types/IFormState";
import type { IUser } from "./IUser";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";
import type { LoginFormData } from "../dtos/loginSchema";

export interface ISigninUserStore extends FormState {
  user: IUser | null;
  reset: () => void;
  handleSigninUser: (
    formData: LoginFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<IUser> },
      Error,
      LoginFormData,
      unknown
    >,
    queryClient: QueryClient,
    navigate: (path: string) => void,
  ) => void;
}