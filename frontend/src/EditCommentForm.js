import React, {Component} from 'react';
import { Col, Button, Form, FormGroup, Input} from 'reactstrap';

//import './CommentForm.css'

class editCommentForm extends Component {
  constructor(props){
    super(props);
    this.state =  { text: this.props.text}
    this.handleChange = this.handleChange.bind(this);
    this.isFilledIn = this.isFilledIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isFilledIn() {
    return this.state.text.length > 0;
  }
  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt){
    evt.preventDefault()
    this.props.handleCommentUpdate(this.state.text)
    this.setState({text: ''})
  }


  render() {
    return (
      <div className="CommentForm" style={{marginTop: '30px'}}>
      <Form onSubmit={this.handleSubmit}> 
        <FormGroup >
        <Col sm={10}>
          <Input 
            onChange={this.handleChange} 
            value={this.state.text} 
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
          disabled={!this.isFilledIn()}
          >Save
          </Button>
        </Col>     
      </Form>
    </div>
    )
  }
}

export default editCommentForm;

