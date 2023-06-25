import { useMemo, useState } from 'react'
import './assets/App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { v4 } from "uuid"

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
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,  
  tagIds: string[]
}

function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note, 
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  function onCreateNote ({tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        {...data, id: v4(), tagIds: tags.map(tag => tag.id)}
      ]
    })
  }

  function addTag (newTag: Tag) {
    setTags(prevTags => [...prevTags, newTag])
  }

  return (
    <>
      <Container className='my-4'>
        <Routes>
          <Route path='/' element={<h1>Hello</h1>} />      
          <Route path='new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />       
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
