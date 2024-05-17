
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/Home/Home'

function App() {

  return (
    <>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
