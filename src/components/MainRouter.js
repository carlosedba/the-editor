import React, { useState, useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Inicio from '@/pages/Inicio'

import { BASEPATH } from '@/globals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio/>
  }
], {
  basename: BASEPATH
})

export default function Main(props) {
  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}
