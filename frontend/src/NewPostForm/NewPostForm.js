import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { addPostToAPI } from './actions';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const NewPostForm = ({ addPostToAPI, history }) => {


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')

  const isFilledIn = () => 
    title.length > 0 && body.length > 0;
  

  const handleSubmit = async evt => {
    evt.preventDefault()
    addPostToAPI({ title, description, body })
    history.push(`/`);
  }

  return (
    <div className="NewPostForm container">
      <h2 color="blue">New Post</h2>
          <Form onSubmit={handleSubmit}> 
      <FormGroup row>
      <Col sm={10}>
        <Label for="NewPost-title">Title:</Label>
          <Input
          onChange={ title => setTitle(title)}
          value={title}
          type="text" name="title"
          id="NewPost-title"  />
      </Col>
      </FormGroup>


      <FormGroup row>
        <Col sm={10}>
        <Label for="NewPost-description">Description:</Label>
          <Input 
          onChange={description => setDescription(description)}
          value={description}
          type="text" name="description"
          id="NewPost-description" />
        </Col>
      </FormGroup>


      <FormGroup row>
        <Col sm={10}>
          <Label for="NewPost-body">Body:</Label>
            <Input
            onChange={body => setBody(body)}
            value={body}
            type="textarea"
            name="body"
            id="NewPost-body" />
        </Col>
      </FormGroup>
        

      <FormGroup check row>
        <Col align="right" sm={{ size: 10, offset: 0}}>
          <Button
          color="success"
          disabled={!isFilledIn}
          >Submit
          </Button> {' '}
          <Button>Cancel</Button>
        </Col>
      </FormGroup>
    </Form>
  </div>
  )
}


const mapDispatchToProps = {
  addPostToAPI
};

export default connect(
  null,
  mapDispatchToProps)(
  withRouter(NewPostForm));
