
import Navbar from './components/Navbar'
import Hero from './page/Hero'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import MusicUpload from './page/MusicUpload'
import { store } from './components/redux/store'
import { Provider } from 'react-redux';
function App() {
 

  return (
    <>
    <Provider store={store} >
    <BrowserRouter basename='/'>
  <Navbar/>
  <Routes>
  <Route path='/' element={<Hero/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='/upload' element={<MusicUpload/>}/>
  </Routes>
  </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
