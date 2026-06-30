import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { TaskFormData } from '../dtos/createTaskSchema';
import { setAuthToken } from "../../auth/utils";

const createTask = async (taskData: TaskFormData) => {
  setAuthToken();
  const response = await axios.post('/tasks',
    taskData,
  );

  return response;
};


export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
    mutationKey: ["createTask"],
  });
};