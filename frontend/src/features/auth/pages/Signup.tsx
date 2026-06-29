import { Box, Button, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, type SignupFormData } from '../dtos/signupSchema'
import { useQueryClient } from "@tanstack/react-query";
import { useSignupStore } from '../store/useSignupStore';
import { useUserSignup } from '../api/signupApi';

const Signup = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient();
  const { mutate } = useUserSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { submitting, handleSignupUser } = useSignupStore();
  const handleSignupFormSubmit = async (signupFormData: SignupFormData) => {
    handleSignupUser(signupFormData, mutate, queryClient, navigate);
  };

  return (
    <>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleSignupFormSubmit)}
        noValidate
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='full_name'
          label='Full Name'
          name='full_name'
          disabled={submitting}
          {...register("full_name")}
          error={!!errors.full_name}
          helperText={errors.full_name?.message}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          type='email'
          {...register("email")}
          disabled={submitting}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          {...register("password")}
          disabled={submitting}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='confirmPassword'
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          {...register("confirmPassword")}
          disabled={submitting}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          loading={submitting}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to='/login'
        sx={{ textTransform: 'none' }}
      >
        Already have an account? Login
      </Button>
    </>
  )
}

export default Signup