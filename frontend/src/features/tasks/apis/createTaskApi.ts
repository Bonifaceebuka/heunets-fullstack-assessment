import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { CreateTaskFormData } from '../dtos/createTaskSchema';
import { setAuthToken } from "../../auth/utils";

const createTask = async (taskData: CreateTaskFormData) => {
  setAuthToken();
   const { project_id, ...payload } = taskData;
  const response = await axios.post(`/tasks/${project_id}/create`,
    payload,
  );

  return response;
};


export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
    mutationKey: ["createTask"],
  });
};