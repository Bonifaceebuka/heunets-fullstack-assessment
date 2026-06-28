import type { FormState } from "../../../shared/types/IFormState";
import type { SignupFormData } from "../../dtos/signupSchema";
import type { IUser } from "./IUser";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";

export interface ISignupUserStore extends FormState {
  user: IUser | null;
  reset: () => void;
  handleSignupUser: (
    formData: SignupFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<IUser> },
      Error,
      SignupFormData,
      unknown
    >,
    queryClient: QueryClient,
    navigate: (path: string) => void,
    toast: (options: any) => void
  ) => void;
}