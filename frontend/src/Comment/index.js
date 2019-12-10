import React, { useState } from 'react';
import { connect } from 'react-redux'
import { removeCommentFromAPI, updateCommentToAPI } from '../actions';
import EditCommentForm from '../EditCommentForm'

const Comment = props => {

  const {
    removeCommentFromAPI,
    updateCommentToAPI, 
    commentText,
    postId,
    commentId,
    toggleEditComment
  } = props

  console.log(props)

  const [isEditForm, setIsEditForm] = useState(false)

  const deleteComment = () => 
    removeCommentFromAPI(commentId, postId)

  const toggleEditCommentForm = () => {
    toggleEditComment()
    setIsEditForm(!isEditForm)
  }
  const handleCommentUpdate = commentText => {
    updateCommentToAPI(commentId, commentText, postId)
    toggleEditCommentForm()
  }
  

    return (
    <div>
      {isEditForm ? 
        <div> 
          <EditCommentForm 
            handleCommentUpdate={handleCommentUpdate}
            text={commentText} commentId={commentId} /> 
        </div>: 
      
        <div className="Comment">
          <i className="fas fa-times d-inline p-2 m-1 left PostIcon PostDelete"
            onClick={deleteComment} />
          <i className="far fa-edit d-inline p-2 m-1 left PostIcon PostEdit" 
                onClick={toggleEditCommentForm} />
          <p className="d-inline p-2 m-1">{commentText}</p>
        </div>
      }
    </div>
    )
}


const mapDispatchToProps = { 
  removeCommentFromAPI,
  updateCommentToAPI,
};

export default connect
(null,
  mapDispatchToProps
  )(Comment);
