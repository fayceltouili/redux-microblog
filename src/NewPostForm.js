import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { addPost } from './actions';
import slugify from 'slugify';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import './NewPostForm.css'

class NewPostForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      title: '',
      description: '',
      body: ''
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
      body: this.state.body,
      comments: []
    }
    const id = slugify(newPost.title)
    this.props.addPost({ [id]: newPost})
    this.props.history.push(`/posts/${id}`);
  }


  render() {
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
              <Input onChange={this.handleChange}
                    value={this.state.body}
                    type="textarea"
                    name="body"
                    id="NewPost-body" />
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
    )
  }
}


const mapDispatchToProps = {
  addPost
};

export default connect(null, mapDispatchToProps)(withRouter(NewPostForm));


     