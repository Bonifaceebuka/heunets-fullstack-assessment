import type { FormState } from "../../../shared/types/IFormState";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";
import type { CreateTaskFormData } from "../dtos/createTaskSchema";

export interface ICreateTaskStore extends FormState {
  reset: () => void;
  handleCreateTask: (
    formData: CreateTaskFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      CreateTaskFormData,
      unknown
    >,
    queryClient: QueryClient,
    handleCreateTaskModalClose: () => void
  ) => void;
}