import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { UpdateTaskFormData } from '../dtos/updateTaskSchema';

const updateTask = async (taskData: UpdateTaskFormData) => {
  const taskId = taskData._id;
  delete taskData._id;
  const response = await axios.put(`/tasks/${taskId}`,
    taskData,
  );

  return response;
};


export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
    mutationKey: ["updateTask"],
  });
};