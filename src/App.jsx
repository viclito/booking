
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/Home/Home'
import ProtectedRoute from './utils/ProtectedRoutes'
import { AuthProvider } from './utils/AuthContext'
import LoginRoute from './utils/LoginRoute'
import Flight from './components/Home/flight/Flight'
import Stay from './components/Home/stay/Stay'
import Profile from './components/Home/profile/Profile'
import { QueryClient, QueryClientProvider } from 'react-query'
import NewComponent from './components/Dummy'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path='/dummy' element={<NewComponent/>}/>
          <Route 
            path='/' 
            element={
              <LoginRoute>
                <Login />
              </LoginRoute>
            } 
          />
          <Route path='/register' 
            element={
              <LoginRoute> 
                <Register/>
              </LoginRoute>} />
          <Route path='/flight' element={<Flight/>} />
          <Route path='/stay' element={<Stay/>} />
          <Route path='/profile' 
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>} 
          />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
