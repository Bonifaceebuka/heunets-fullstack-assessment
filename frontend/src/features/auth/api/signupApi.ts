"use client";

import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { SignupFormData } from '../dtos/signupSchema';

const UserSignup = async (signupData: SignupFormData) => {
  const { email, password, full_name } = signupData
  const data = { email, password, full_name }
  const response = await axios.post('/authentication/register',
    data,
  );

  return response;
};


export const useUserSignup = () => {
  return useMutation({
    mutationFn: UserSignup,
    mutationKey: ["user"],
  });
};