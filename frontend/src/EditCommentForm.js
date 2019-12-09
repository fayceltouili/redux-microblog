import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Input} from 'reactstrap';


const editCommentForm = props => {

  const { oldComment, handleCommentUpdate } = props;

  const [comment, setComment] = useState(oldComment)


  const isFilledIn = () => {
    return !(comment.length > 0);
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    handleCommentUpdate(comment)
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
          name="text" 
          id="text" 
          placeholder="New Comment" 
        />
        </Col>
      </FormGroup>  
      <Col align="right" sm={{ size: 10, offset: 0}}>
        <Button
        color="success"
        disabled={isFilledIn()}
        >Save
        </Button>
      </Col>     
    </Form>
  </div>
  )
}

export default editCommentForm;
