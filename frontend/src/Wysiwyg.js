import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { addPostToAPI } from './actions';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class EditorComponent extends Component {
  constructor(props) {
    super(props);
    const html = '<p></p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        title: '',
        description: '',
        editorState,
      };
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const newPost = {
      title: this.state.title,
      description: this.state.description,
      body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    }
    this.props.addPostToAPI(newPost)
    this.props.history.push(`/`);
  }



  render() {
    const { editorState } = this.state;
    let value= convertToRaw(editorState.getCurrentContent())
    console.log(value)

    return (
      <div className="NewPostForm container">
        <h2 color="blue">New Post</h2>
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
            <Label for="NewPost-body">Body:</Label>
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            />
          </Col>
        </FormGroup>
        
        <FormGroup check row>
          <Col align="right" sm={{ size: 10, offset: 0}}>
            <Button
            color="success"
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
function mapStateToProps(state) {
  return {
    categories: state.categories,
    categoriesList: Object.values(state.categories)
  };
}

const mapDispatchToProps = {
  addPostToAPI
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditorComponent));

// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// export default EditorComponent;