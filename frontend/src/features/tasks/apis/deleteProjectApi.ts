import { setAuthToken } from "../../auth/utils";
import { axios } from '../../../shared/configs/axios';
import { useMutation } from '@tanstack/react-query';

const deleteProject = async (project_id: string) => {
  setAuthToken();
  const response = await axios.delete(`/projects/${project_id}`);
  return response;
};

export const useDeleteProject = () => {
    return useMutation({
        mutationFn: deleteProject,
        mutationKey: ["deleteProject"]
    });
};