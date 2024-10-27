import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Bro } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Carts from './pages/Carts'
import Account from './pages/Account'
import Login from './auth/Login'
import Register from './auth/Register'

createRoot(document.getElementById('root')!).render(
  <Bro>
    <App />
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/cart' element={<Carts />} />
        <Route path='/account' element={<Account />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
  </Bro>,
)
