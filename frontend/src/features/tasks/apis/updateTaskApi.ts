import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { UpdateTaskFormData } from '../dtos/updateTaskSchema';

const updateTask = async (taskData: UpdateTaskFormData) => {
  const taskId = taskData._id;
  const { _id, ...payload } = taskData;
  const response = await axios.put(`/tasks/${taskId}`,
    payload,
  );

  return response;
};


export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
    mutationKey: ["updateTask"],
  });
};