import { setAuthToken } from "../../auth/utils";
import { axios } from '../../../shared/configs/axios';
import { useMutation } from '@tanstack/react-query';

const deleteTask = async (task_id: string) => {
  setAuthToken();
  const response = await axios.delete(`/tasks/${task_id}`);
  return response;
};

export const useDeleteTask = () => {
    return useMutation({
        mutationFn: deleteTask,
        mutationKey: ["deleteTask"]
    });
};