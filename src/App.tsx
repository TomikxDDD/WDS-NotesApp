import { useState } from 'react'
import './assets/App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NewNote from './components/NewNote/NewNote'
import { useLocalStorage } from './hooks/useLocalStorage'


export type Tag = {
  id: string,
  label: string
}

export type NoteData = {
  title: string,
  markdown: string,  
  tags: Tag[]
}

export type Note = {
  id: string,
} & NoteData

export type RawNote = {
  id: string,
}

export type RawNoteData = {
  title: string,
  markdown: string,  
  tagIds: string[]
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  return (
    <>
      <Container className='my-4'>
        <Routes>
          <Route path='/' element={<h1>Hello</h1>} />      
          <Route path='new' element={<NewNote />} />       
          <Route path=':id'>
            <Route index element={<h1> Show </h1>} /> 
            <Route path='edit' element={<h1> Edit </h1>} />
          </Route>       
          {/* Navigate component brings us back to the selected path */}
          <Route path='*' element={<Navigate to='/'/>} />       
        </Routes>
      </Container>
    </>
  )
}

export default App
