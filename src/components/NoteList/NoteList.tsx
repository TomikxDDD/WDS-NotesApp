import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../../App";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import { useState, useMemo } from "react";
import NoteCard from "../NoteCard/NoteCard";
import EditTagsModal from "../EditTagsModal/EditTagsModal";


interface NoteListProps {
  notes: Note[]
  availableTags: Tag[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

const NoteList: React.FC<NoteListProps> = ({ notes, availableTags, onUpdateTag, onDeleteTag }) => {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const [title, setTitle] = useState('')

  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
        (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      )
    })
  }, [title, selectedTags, notes])
  
  


  return ( 
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1> My notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack direction="horizontal" gap={2}>
            <Link to='/new'>
              <Button variant="primary">Create</Button>
            </Link>
            <Button 
              variant="secondary"
              onClick={() => setEditTagsModalIsOpen(true)}
            >Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <FormGroup controlId='title'>
              <Form.Label> Title </Form.Label>
              <Form.Control 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            </FormGroup>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id } // This is the shape which the CreatebleReactSelect expects
                })}
                options={availableTags.map(tag => {
                  return { label: tag.label, value: tag.id} // This is the shape which the CreatebleReactSelect expects
                })}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => {
                    return { label: tag.label, id: tag.value} // Converting back to our shape of the Tag type
                  }))
                }}
              isMulti />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note, idx) => (
          <Col key={idx}>
            <NoteCard id={note.id} title={note.title} tags={note.tags}/>
          </Col>
      ))}
      </Row>
      <EditTagsModal 
        show={editTagsModalIsOpen} 
        handleClose={() => setEditTagsModalIsOpen(false)} 
        availableTags={availableTags} 
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
      
    </>
  );
}
 
export default NoteList;