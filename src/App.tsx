import { useMemo, useState } from 'react'
import './assets/App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { v4 } from "uuid"

import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NewNote from './components/NewNote/NewNote'
import { useLocalStorage } from './hooks/useLocalStorage'
import NoteList from './components/NoteList/NoteList'
import NoteLayout from './layouts/NoteLayout'
import Note from './components/Note/Note'
import EditNote from './components/EditNote/EditNote'


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

export type RawNoteData = {
  title: string,
  markdown: string,  
  tagIds: string[]
}
export type RawNote = {
  id: string,
} & RawNoteData



function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])


  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note, 
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  function onUpdateNote (id: string, {tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id){
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note
        }
      })
    })
  }

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        {...data, id: v4(), tagIds: tags.map(tag => tag.id)}
      ]
    })
  }

  function onDeleteNote(id: string){
    setNotes(prevNotes => prevNotes.filter( note => (
      note.id !== id 
    )))
  }

  function addTag (newTag: Tag) {
    setTags(prevTags => [...prevTags, newTag])
  }

  function updateTag (id: string, label: string) {
    setTags(prevTags => prevTags.map(tag => {
      if (tag.id === id) {
        return {...tag, label}
      } else {
        return tag
      }
    }))
  }

  function deleteTag (id: string){
    setTags(prevTags => prevTags.filter(tag => {
      return tag.id !== id
    }))
  }

  return (
    <>
      <Container className='my-4'>
        <Routes>
          <Route 
            path='/' 
            element={
              <NoteList 
                notes={notesWithTags} 
                availableTags={tags} 
                onUpdateTag={updateTag} 
                onDeleteTag={deleteTag}
              />
            } 
          />      
          <Route 
            path='/new' 
            element={
              <NewNote 
                onSubmit={onCreateNote} 
                onAddTag={addTag} 
                availableTags={tags} 
              />
            } 
          />       
          <Route 
            path=':id' 
            element={<NoteLayout notes={notesWithTags}/>}>

            <Route index element={<Note onDelete={onDeleteNote}  />} /> 
            <Route 
              path='edit' 
              element={
                <EditNote 
                  onSubmit={onUpdateNote} 
                  onAddTag={addTag} 
                  availableTags={tags}
                />
              } 
            />
          </Route>       
          {/* Navigate component brings us back to the selected path */}
          <Route 
            path='*' 
            element={<Navigate to='/'/>} />       
        </Routes>
      </Container>
    </>
  )
}

export default App
