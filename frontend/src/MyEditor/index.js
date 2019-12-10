/*
* Form to add a new Post
*/

import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { addPostToAPI } from '../actions';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorComponent = props => {

  const { addPostToAPI, history } = props;

  const html = ''
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

 
  // disable submit button if title && body are empty
  const isFilledIn = () => 
    title.length > 0 && draftToHtml(convertToRaw(editorState.getCurrentContent())).length > 10
  
 
  const handleSubmit = async evt => {
    evt.preventDefault()
    addPostToAPI({
      title,
      description,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    })
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
          onChange={e => setTitle(e.target.value)}
          value={title}
          type="text" name="title"
          id="NewPost-title"  />
      </Col>
      </FormGroup>


      <FormGroup row>
        <Col sm={10}>
        <Label for="NewPost-description">Description:</Label>
          <Input
          onChange={e => setDescription(e.target.value)}
          value={description}
          type="text" name="description"
          id="NewPost-description" />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={10}>
          <Label for="NewPost-body"></Label>
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={editorState =>
              setEditorState(editorState)}
            />
        </Col>
      </FormGroup>
      
      <FormGroup check row>
        <Col align="right" sm={{ size: 10, offset: 0}}>
          <Button
          color="success"
          disabled={!isFilledIn()}
          >Submit
          </Button> {' '}
          <Button>Cancel</Button>
        </Col>
      </FormGroup>
      </Form>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    categoriesList: Object.values(state.categories)
  };
}

const mapDispatchToProps = {
  addPostToAPI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(withRouter(EditorComponent));
