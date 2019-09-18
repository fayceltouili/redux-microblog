import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody,
  CardText, CardFooter } from 'reactstrap';
  import Vote from './Vote'

//import './BlogpostCard.css'

class BlogpostCard extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    const {title, description, id, tags} = this.props

    return (
      <div className="BlogpostCard col-sm-4, col-lg-3">
        <Card>
          <CardHeader tag="h3"><Link to={`posts/${id}`}>{title}</Link></CardHeader>
          <CardBody>
            <CardText>{description}</CardText>
            {/* <CardText>tags: {tags.map( tag=> ( <i>{tag}</i>))}</CardText> */}
          </CardBody>
        <CardFooter > <Vote postId={id}/></CardFooter>
        </Card>
      </div>
    )
  }
}

export default BlogpostCard