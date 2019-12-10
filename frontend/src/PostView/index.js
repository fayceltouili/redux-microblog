import React from 'react';
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter
} from 'reactstrap';
import Vote from '../Vote'


const BlogpostCard = props => {

  const { title, description, id } = props

  return (
    <div className="BlogpostCard col-sm-4, col-lg-3">
      <Card>
        <CardHeader tag="h3">
          <Link to={`posts/${id}`}>{title || 'temp'}</Link>
        </CardHeader>
        <CardBody>
          <CardText>{description}</CardText>
        </CardBody>
        <CardFooter > <Vote postId={id}/></CardFooter>
      </Card>
    </div>
  )
  
}

export default BlogpostCard;
