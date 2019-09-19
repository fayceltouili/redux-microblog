import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class WysiwygEdit extends Component {
  constructor(props) {
    super(props);
    const html = this.props.body;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        title: this.props.title,
        description: this.props.description,
        editorState,
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isFilledIn = this.isFilledIn.bind(this);
  }

  isFilledIn() {
    const body = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    return this.state.title.length > 0 && body.length > 10;
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }
  
  async handleSubmit(evt){
    evt.preventDefault()
    const updatedPost = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    }
    this.props.handleUpdate(updatedPost,this.props.id)
    this.setState({ title: '', description: '', body: ''})
    this.props.toggleEditForm()
  }


  render() {
    const { editorState } = this.state;
    let value= convertToRaw(editorState.getCurrentContent())
    console.log(value)

    return (
      <div className="NewPostForm container">
        <h2 color="blue">Edit Post</h2>
           <Form onSubmit={this.handleSubmit}> 
        <FormGroup row>
        <Col sm={10}>
          <Label for="NewPost-title">Title:</Label>
            <Input onChange={this.handleChange}
                   value={this.state.title}
                   type="text" name="title"
                   id="NewPost-title"  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={10}>
          <Label for="NewPost-description">Description:</Label>
            <Input onChange={this.handleChange}
                  value={this.state.description}
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
              onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </Col>
        </FormGroup>
        
        <FormGroup check row>
          <Col align="right" sm={{ size: 10, offset: 0}}>
            <Button
            color="success"
            disabled={!this.isFilledIn()}
            >Submit
            </Button> {' '}
            <Button>Cancel</Button>
          </Col>
        </FormGroup>
        </Form>
        </div>
      
      
    );
  }
}
