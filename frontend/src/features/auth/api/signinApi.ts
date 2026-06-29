"use client";

import { useMutation } from '@tanstack/react-query';
import { axios } from '../../../shared/configs/axios';
import type { LoginFormData } from '../dtos/loginSchema';

const UserSignin = async (signinData: LoginFormData) => {
  const response = await axios.post('/authentication/login',
    signinData,
  );

  return response;
};


export const useUserSignin = () => {
  return useMutation({
    mutationFn: UserSignin,
    mutationKey: ["user"],
  });
};