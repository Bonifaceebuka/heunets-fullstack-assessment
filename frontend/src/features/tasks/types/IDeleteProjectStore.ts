import type { FormState } from "../../../shared/types/IFormState";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";

export interface IDeleteProjectStore extends FormState {
  reset: () => void;
  handleDeleteProject: (
    project_id: string,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      string,
      unknown
    >,
    queryClient: QueryClient,
  ) => void;
}