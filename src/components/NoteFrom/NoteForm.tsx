import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable'
import { Link } from 'react-router-dom'
import { useState, useRef, FormEvent } from 'react';
import { NoteData, Tag } from '../../App';


interface NoteFormProps{
  onSubmit: (data: NoteData) => void
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {

  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  function handleSubmit(e: FormEvent){
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: []
    })
  }

  return ( 
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect 
                  value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id } // This is the shape which the CreatebleReactSelect expects
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
                <Form.Control ref={markdownRef} as="textarea" rows={10} />
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