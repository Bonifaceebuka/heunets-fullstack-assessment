import { Container, Box } from '@mui/material'
import {Outlet, useNavigate} from "react-router-dom";
import Loading from '../../../shared/common/Loading';
import { useEffect, useState } from 'react';
import { tokenStorage } from '../../../shared/configs/axios';
import { isTokenExpired } from '../../../shared/utils/jwt_token';


const AuthLayout = ()=>{
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
     const checkAuth = () => {
      const tokenDetail = tokenStorage.getToken();
      const isAuthenticated = tokenDetail?.isAuthenticated;
      const token = tokenDetail?.token;
      console.log({isAuthenticated})
      console.log({isTokenExpired: isTokenExpired(token)})
      // Check if token is expired
      if (!isAuthenticated || isTokenExpired(token)) {
        tokenStorage.clearToken();
        setLoading(false);
      }
      else{
        navigate("/projects");
      }

    };

  useEffect(() => {
      checkAuth()
    }, [navigate]);

  return (
     loading ? (
          <Loading fullHeight />
        ) : (
    <Container component='main' maxWidth='xs'>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          {/* <img src={assets.images.demoIcon} style={{ width: '120px' }} alt='app logo' /> */}
          <Outlet />
        </Box>
      </Container>
        )
  )
}

export default AuthLayout;