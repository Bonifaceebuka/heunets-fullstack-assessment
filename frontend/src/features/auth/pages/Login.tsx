import { Box, Button, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { loginSchema, type LoginFormData } from '../dtos/loginSchema'
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserSignin } from '../api/signinApi'
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSigninStore } from '../store/useSigninStore';


const Login = () => {
  const { mutate } = useUserSignin();
      const queryClient = useQueryClient();
      const navigate = useNavigate()
  
      const {
          register,
          handleSubmit,
          formState: { errors },
      } = useForm<LoginFormData>({
          resolver: zodResolver(loginSchema),
          defaultValues: {
              email: "",
              password: "",
          },
      });
  
      const { submitting, handleSigninUser } = useSigninStore();
      const handleLogin = async (data: LoginFormData) => {
          handleSigninUser(data, mutate, queryClient,navigate);
      };
  return (
    <>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          disabled={submitting}
          error={errors.email !== undefined}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          disabled={submitting}
          error={errors.password !== undefined}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          disabled={submitting}
        >
          Login
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to='/signup'
        sx={{ textTransform: 'none' }}
      >
        Don't have an account? Signup
      </Button>
    </>
  )
}

export default Login