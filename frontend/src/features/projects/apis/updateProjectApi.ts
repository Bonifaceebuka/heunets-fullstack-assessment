"use client";

import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { UpdateProjectFormData } from '../dtos/updateProjectSchema';

const updateProject = async (projectData: UpdateProjectFormData) => {
  const payload = {
    name: projectData.name,
    description: projectData.description
  }
  const response = await axios.put(`/projects/${projectData._id}`,
    payload,
  );

  return response;
};


export const useUpdateProject = () => {
  return useMutation({
    mutationFn: updateProject,
    mutationKey: ["updateProject"],
  });
};