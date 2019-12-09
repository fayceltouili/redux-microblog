import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WysiwygEdit from '../WysiwygEdit';
import CommentForm from '../CommentForm';
import Comment from '../Comment'
import Vote from '../Vote';
import {
  removePostFromAPI,
  updatePostToAPI,
  addCommentToAPI
} from '../actions';
import './PostDetails.css'


const PostDetails = props => {

  const { post, postId, removePostFromAPI } = props
  const [isEditForm, setIsEditForm] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)


console.log(post)
  const toggleEditForm = () => 
    setIsEditForm(!isEditForm)
  

  const handleDelete = () => 
    removePostFromAPI(postId);


  const addComment = text => {
    return addCommentToAPI(text, postId)
  }
    
  
  const handleUpdate = updatePost => 
    updatePostToAPI(postId,updatePost)
  

    if(!post){
      return <Redirect to="/"></Redirect>
    }

  return (
    <div className="PostDetails container">
      {isEditForm ? <WysiwygEdit
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
          <td dangerouslySetInnerHTML={{__html: post.body}} />
        </div>
        <hr></hr>
        <h3>Comments</h3>
        {post.comments.map(comment => 
          <Comment
          comment={comment.text}
          postId={postId}
          commentId={comment.id}
          key={comment.id}
          toggleEditComment={() => setIsEditingComment(!isEditingComment)} />)}
        {!isEditingComment ? 
          <CommentForm  addComment={addComment}/> : null}
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




