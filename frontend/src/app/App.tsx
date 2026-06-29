import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../app/NotFound";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import Projects from "../features/projects/pages/Projects";
import CreateProject from "../features/projects/pages/CreateProjects";
import AuthLayout from "../features/auth/layout/AuthLayout";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseLine from '@mui/material/CssBaseline'
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
      palette: { mode: 'dark' }
    })
  return (
<QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <Toaster richColors position="top-right" />
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
  )
}

export default App
