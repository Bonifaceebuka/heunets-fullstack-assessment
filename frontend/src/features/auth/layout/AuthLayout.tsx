import { Container, Box } from '@mui/material'
import { useState } from 'react'
import {Outlet} from "react-router-dom";
import Loading from '../../../shared/common/Loading';


const AuthLayout = ()=>{
  const [loading] = useState(true);

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