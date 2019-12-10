import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Input} from 'reactstrap';

const CommentForm = ({ addComment }) => {

  const [comment, setComment] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    addComment(comment)
    setComment('')
  }

  return (
    <div className="CommentForm" style={{marginTop: '30px'}}>
    <Form onSubmit={handleSubmit}> 
      <FormGroup >
      <Col sm={10}>
        <Input 
          onChange={e => setComment(e.target.value)} 
          value={comment} 
          rows="3"
          type="textarea" 
          name="comment" 
          id="comment" 
          placeholder="New Comment" 
        />
        </Col>
      </FormGroup>  
      <Col align="right" sm={{ size: 10, offset: 0}}>
        <Button
        color="success"
        disabled={!(comment.length > 0)}
        >Add comment
        </Button>
      </Col>     
    </Form>
  </div>
  )
}

export default CommentForm
