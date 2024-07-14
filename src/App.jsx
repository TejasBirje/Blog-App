import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth.js"
import {login, logout} from "./store/authSlice.js"
import {Header, Footer} from "./components/index.js"
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)  // With this we can conditional loading, if loading is true, display loading icon. As some things may take time to run
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => { // if we successfully get user then
      if (userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    }) 
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
