import type { FormState } from "../../../shared/types/IFormState";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";
import type { UpdateTaskFormData } from "../dtos/updateTaskSchema";

export interface IUpdateTaskStore extends FormState {
  reset: () => void;
  handleUpdateTask: (
    formData: UpdateTaskFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      UpdateTaskFormData,
      unknown
    >,
    queryClient: QueryClient,
    handleEditTaskModalClose: () => void
  ) => void;
}