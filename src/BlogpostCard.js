import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody,
  CardText } from 'reactstrap';

//import './BlogpostCard.css'

class BlogpostCard extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    const {title, description, id} = this.props

 
    return (
      <div className="BlogpostCard col-sm-4, col-lg-3">
        <Card>
          <CardHeader tag="h3"><Link to={`posts/${id}`}>{title}</Link></CardHeader>
          <CardBody>
            <CardText>{description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default BlogpostCard