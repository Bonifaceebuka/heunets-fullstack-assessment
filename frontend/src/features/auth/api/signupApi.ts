"use client";

import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { SignupFormData } from '../../dtos/signupSchema';

const UserSignup = async (data: SignupFormData) => {
  const response = await axios.post('/auth/signup',
    data,
  );

  return response;
};


export const useUserSignup = () => {
  return useMutation({
    mutationFn: UserSignup
  });
};