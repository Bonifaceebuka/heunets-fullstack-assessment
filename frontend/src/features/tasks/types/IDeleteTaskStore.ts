import type { FormState } from "../../../shared/types/IFormState";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";

export interface IDeleteTaskStore extends FormState {
  reset: () => void;
  handleDeleteTask: (
    task_id: string,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      string,
      unknown
    >,
    queryClient: QueryClient,
  ) => void;
}