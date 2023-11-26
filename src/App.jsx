
import Navbar from './components/Navbar'
import Hero from './page/Hero'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'

function App() {
 

  return (
    <>
    <BrowserRouter basename='/'>
  <Navbar/>
  <Routes>
  <Route path='/' element={<Hero/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App