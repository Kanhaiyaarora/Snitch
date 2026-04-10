import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import './App.css'

const App = () => {

  return (
      <RouterProvider router={router}></RouterProvider>
  )
}

export default App

