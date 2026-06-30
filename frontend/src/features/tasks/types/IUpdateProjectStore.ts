import type { FormState } from "../../../shared/types/IFormState";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";
import type { UpdateProjectFormData } from "../dtos/updateProjectSchema";

export interface IUpdateProjectStore extends FormState {
  reset: () => void;
  handleUpdateProject: (
    formData: UpdateProjectFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      UpdateProjectFormData,
      unknown
    >,
    queryClient: QueryClient,
    handleEditProjectModalClose: () => void
  ) => void;
}