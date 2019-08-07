import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

//import './NewPostForm.css'

class EditPostForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      title: this.props.title,
      description: this.props.description,
      body: this.props.body
    }
    this.handleChange = this.handleChange.bind(this);
    this.isFilledIn = this.isFilledIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isFilledIn() {
    return this.state.title.length > 0 && this.state.body.length > 0;
  }
  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt){
    evt.preventDefault()
    const newPost = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body
    }
    this.props.updateBlogPost(newPost,this.props.id)
    this.setState({ title: '', description: '', body: ''})
    this.props.toggleEditForm()

  }


  render() {
    return (
      <div className="EditPostForm">
        <h2>Edit Post</h2>
           <Form onSubmit={this.handleSubmit}> 
        <FormGroup row>
          <Label for="EditPost-title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} value={this.state.title} type="text" name="title" id="EditPost-title"  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="EditPost-description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} value={this.state.description} type="text" name="description" id="EditPost-description" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="EditPost-body" sm={2}>Body</Label>
          <Col sm={10}>
            <Input onChange={this.handleChange} value={this.state.body} type="textarea" name="body" id="EditPost-body" />
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button 
            disabled={!this.isFilledIn()}
            >Submit
            </Button> 
          </Col>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Cancel</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    )
  }
}

export default EditPostForm

     