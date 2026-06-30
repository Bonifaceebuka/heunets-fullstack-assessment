import type { FormState } from "../../../shared/types/IFormState";
import type { ProjectFormData } from "../dtos/projectSchema";
import type { QueryClient, UseMutateFunction } from "@tanstack/react-query";
import type { IApiResponse } from "../../../shared/types/IApiResponse";

export interface IProjectStore extends FormState {
  reset: () => void;
  handleCreateProject: (
    formData: ProjectFormData,
    mutate: UseMutateFunction<
      { data: IApiResponse<any> },
      Error,
      ProjectFormData,
      unknown
    >,
    queryClient: QueryClient,
    handleCreateProjectModalClose: () => void
  ) => void;
}