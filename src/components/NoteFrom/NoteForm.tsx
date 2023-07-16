import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, FormEvent } from 'react';
import { NoteData, Tag } from '../../App';
import { v4 } from "uuid"


// Conditionally adding all the properties of NoteData type - to make it possible to visualize for editing the note
type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

const NoteForm: React.FC<NoteFormProps> = ({ 
  onSubmit, 
  onAddTag, 
  availableTags, 
  title="", 
  tags=[], 
  markdown="" 
}) => {

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  const navigate = useNavigate()

  function handleSubmit(e: FormEvent){
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    })

    navigate('..') // Sends the user to the previous page
  }

  return ( 
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect 
                // This function is called when we create a new Tag. onChange is not called when we create a new tag
                  onCreateOption={ label => {
                    const newTag = { id: v4(), label: label }
                    onAddTag(newTag)
                    setSelectedTags(prevTags => [...prevTags, newTag])
                  }}
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
          <Row>
            <Col>
              <Form.Group controlId='markdown'>
                <Form.Label>Note</Form.Label>
                <Form.Control ref={markdownRef} as="textarea" rows={10} defaultValue={markdown} />
              </Form.Group>
            </Col>
          </Row>
          <Stack direction="horizontal" gap={3} className='justify-content-end'>
            <Button type='submit' variant='primary'>Save</Button>
            <Link to=".."> {/* Allows the user to go back to the previous page they visited in their browsing history */}
              <Button type='button' variant='outline-secondary'>Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      </Form>

    </>
   );
}
 
export default NoteForm;