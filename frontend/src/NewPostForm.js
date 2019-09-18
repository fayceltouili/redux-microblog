import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { addPostToAPI } from './actions';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//import './NewPostForm.css'

class NewPostForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      title: '',
      description: '',
      body: '',
      ...this.props.categoriesList.reduce((acc, currCategory) => {
        acc[currCategory] = false
        return acc
      }, {})

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
  
  handleCategoriesToggle(category) {
    this.setState(st => ({[category]: !st.category}))
  }

  async handleSubmit(evt){
    evt.preventDefault()
    const newPost = {
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
    }
    this.props.addPostToAPI(newPost)
    this.props.history.push(`/`);
  }


  render() {
    console.log("props", this.props, 'state', this.state)
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
{/* 
        <FormGroup row>
          {this.props.categories.map(category => (
            <div d-inline >
              <Label for={`NewPost-categories-${category}`}>{category}       
              <Input type="checkbox" id={`NewPost-categories-${category}`} />{' '}
              </Label>
              
            </div>
          ))}
        </FormGroup> */}

            <div>
              tags:
            {this.props.categoriesList.map( (tag) => (
              <i d-inline style={{backgroundColor: '#D5EAF2', marginRight: '4px'}}  onClick={(tag) => {this.handleCategoriesToggle(tag)}}> {tag}</i>
            ))}
            </div>

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

function mapStateToProps(state) {
  return {
    categories: state.categories,
    categoriesList: Object.values(state.categories)
  };
}

const mapDispatchToProps = {
  addPostToAPI
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewPostForm));


     