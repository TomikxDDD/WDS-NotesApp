import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { Routes, Route, Navigate } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<h1>Hello</h1>} />      
        <Route path='/new' element={<h1>New item</h1>} />       
        <Route path='/:id'>
          <Route index element={<h1> Show </h1>} /> 
          <Route path='edit' element={<h1> Edit </h1>} />
        </Route>       
        {/* Navigate component brings us back to the selected path */}
        <Route path='*' element={<Navigate to='/'/>} />       
      </Routes>
    </>
  )
}

export default App
