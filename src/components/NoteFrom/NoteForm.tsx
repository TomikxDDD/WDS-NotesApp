import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable'
import { Link } from 'react-router-dom'

const NoteForm: React.FC = () => {
  return ( 
    <>
      <Form>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect isMulti />
                  

              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group controlId='markdown'>
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" rows={10} />
            </Form.Group>
            </Col>
          </Row>
          <Stack direction="horizontal" gap={3} className='justify-content-end'>
            <Button type='submit' variant='primary'>Save</Button>
            <Link to=".."> {/* Brings user one step back in the history */}
              <Button type='button' variant='outline-secondary'>Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      </Form>

    </>
   );
}
 
export default NoteForm;