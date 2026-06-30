import type { FormState } from "../../../shared/types/IFormState";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";
import type { TaskFormData } from "../dtos/createTaskSchema";

export interface ICreateTaskStore extends FormState {
  reset: () => void;
  handleCreateTask: (
    formData: TaskFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      TaskFormData,
      unknown
    >,
    queryClient: QueryClient,
    handleCreateTaskModalClose: () => void
  ) => void;
}