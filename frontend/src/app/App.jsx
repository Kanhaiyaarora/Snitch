import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import './App.css'
import { useAuth } from '../features/auth/hook/useAuth'


const App = () => {

  const { handleGetMe } = useAuth()

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

