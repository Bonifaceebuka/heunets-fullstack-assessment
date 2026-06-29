import { Container, Box } from '@mui/material'
import {Outlet} from "react-router-dom";


const AuthLayout = ()=>{
  return (
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
}

export default AuthLayout;