import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import uuid from 'uuid/v4'

//import './CommentForm.css'

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state =  { comment: '' }
    this.handleChange = this.handleChange.bind(this);
    this.isFilledIn = this.isFilledIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isFilledIn() {
    return this.state.comment.length > 0;
  }
  handleChange(evt){
		this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt){
    evt.preventDefault()
    const commentId = uuid();
    const comment = {
      text: this.state.comment
    }

    this.props.addComment(comment, commentId)
    this.setState({comment: ''})
  }


  render() {
    return (
      <div className="CommentForm" style={{marginTop: '30px'}}>
      <Form onSubmit={this.handleSubmit}> 
        <FormGroup >
        <Col sm={10}>
          <Input 
            onChange={this.handleChange} 
            value={this.state.comment} 
            rows="5"
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
          disabled={!this.isFilledIn()}
          >Add
          </Button>
        </Col>     
      </Form>
    </div>
    )
  }
}

export default CommentForm

