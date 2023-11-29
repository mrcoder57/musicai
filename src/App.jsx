
import Navbar from './components/Navbar'
import Hero from './page/Hero'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import MusicUpload from './page/MusicUpload'
import { store } from './components/redux/store'
import { Provider } from 'react-redux';

import ArtistPage from './page/ArtistPage'
import GenrePage from './page/GenrePage'
import Search from './page/Search'
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
  <Route path='/search' element={<Search/>}/>
  <Route path='/upload' element={<MusicUpload/>}/>
  <Route path='/artist/:id' element={<ArtistPage/>}/>
  <Route path='/genres/:genre' element={<GenrePage/>}/>
  </Routes>
  </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
