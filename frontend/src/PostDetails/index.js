import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EditPost from '../MyEditor/EditPost';
import Comment from '../Comment'
import Vote from '../Vote';
import {
  removePostFromAPI,
  updatePostToAPI,
  addCommentToAPI
} from '../actions';
import './PostDetails.css'
import { Col, Button, Form, FormGroup, Input} from 'reactstrap';


const PostDetails = props => {

  const {
    post,
    postId,
    removePostFromAPI,
    updatePostToAPI,
    addCommentToAPI
  } = props

  const [isEditForm, setIsEditForm] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [comment, setComment] = useState('')


  const toggleEditForm = () => 
    setIsEditForm(!isEditForm)
  

  const handleDelete = async () => 
    removePostFromAPI(postId);


  const addComment = async evt => {
    evt.preventDefault()
    addCommentToAPI(comment, postId)
  }
    
  const handleUpdate = async updatePost => 
    updatePostToAPI(postId, updatePost)
  

  if(!post) return <Redirect to="/" />

  return (
    <div className="PostDetails container">
      {isEditForm ? <EditPost
        handleUpdate={handleUpdate}
        toggleEditForm={toggleEditForm}
        post={post}
        id={postId}/>:
      <div>
        <div>
          <div>
          <h1 className="d-inline left" >{post.title}</h1>
            <i className="far fa-edit d-inline p-2 m-1 float-right PostIcon PostEdit" 
              onClick={toggleEditForm} />
            <i className="fas fa-times d-inline p-2 m-1 float-right PostIcon PostDelete"
            onClick={handleDelete} />
          </div>
        <div >
          <i className="d-inlin left" >{post.description}</i>
          <div className="d-inline p-2 m-1 float-right">
            <Vote className="d-inline p-8 m-30 float-right" postId={postId}/>
          </div>
        </div>

          <br/><br/>
          <div dangerouslySetInnerHTML={{__html: post.body}} />
        </div>
        <hr></hr>
        <h3>Comments</h3>
        {post.comments.map(comment => 
          <Comment
          commentText={comment.text}
          postId={postId}
          commentId={comment.id}
          key={comment.id}
          toggleEditComment={() => setIsEditingComment(!isEditingComment)} />)}
        {!isEditingComment ? 
          <div className="CommentForm" style={{marginTop: '30px'}}>
          <Form onSubmit={addComment}> 
            <FormGroup >
            <Col sm={10}>
              <Input 
                onChange={e => setComment(e.target.value)} 
                value={comment} 
                rows="3"
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
              disabled={!(comment.length > 0)}
              >Add comment
              </Button>
            </Col>     
          </Form>
        </div>: null}
      </div> 
      }      
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.id

  return {
    post: state.posts[postId],
    postId,
  };
}

const mapDispatchToProps = {
  removePostFromAPI, 
  updatePostToAPI, 
  addCommentToAPI,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(PostDetails);



