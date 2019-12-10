/**
 *  Edit and update post
 */
import React, { useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const WysiwygEdit = props => {

  const { handleUpdate, toggleEditForm, post } = props

  const html = post.body
  const contentBlock = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);


  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));



  // disable submit button if title && body are empty
  const isFilledIn = () => 
    title.length > 0 && draftToHtml(convertToRaw(editorState.getCurrentContent())).length > 10

  const handleSubmit = async evt => {
    evt.preventDefault()
    handleUpdate({
      title,
      description,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    },
    post.id)
    toggleEditForm()
  }
  
  

  return (
    <div className="NewPostForm container">
      <h2 color="blue">Edit Post</h2>
          <Form onSubmit={handleSubmit}> 
      <FormGroup row>
      <Col sm={10}>
        <Label for="NewPost-title">Title:</Label>
          <Input
          onChange={e =>
            setTitle(e.target.value)}
          value={title}
          type="text" name="title"
          id="NewPost-title"  />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={10}>
        <Label for="NewPost-description">Description:</Label>
          <Input
          onChange={e =>
            setDescription(e.target.value)}
          value={description}
          type="text" name="description"
          id="NewPost-description" />
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={10}>
          <Label for="NewPost-body"></Label>
          <div style={{border:'1px solid #00000030'}}>
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={editorState =>
              setEditorState(editorState)}
            />
          </div>
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

export default WysiwygEdit;
