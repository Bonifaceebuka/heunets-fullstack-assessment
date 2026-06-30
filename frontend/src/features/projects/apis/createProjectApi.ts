import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { ProjectFormData } from '../dtos/projectSchema';
import { setAuthToken } from "../../auth/utils";

const createProject = async (projectData: ProjectFormData) => {
  setAuthToken();
  const response = await axios.post('/projects',
    projectData,
  );

  return response;
};


export const useCreateProject = () => {
  return useMutation({
    mutationFn: createProject,
    mutationKey: ["createProject"],
  });
};