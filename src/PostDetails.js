import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import EditPostForm from './EditPostForm';
import CommentForm from './CommentForm';
import Comment from './Comment'
import Vote from './Vote';
import { removePostFromAPI, updatePostToAPI, addCommentToAPI } from './actions';
import { connect } from 'react-redux';
import './PostDetails.css'


class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
      isEditingComment: false,
    }
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.toggleEditComment = this.toggleEditComment.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.addComment = this.addComment.bind(this)
  }

  toggleEditForm() {
    this.setState(st => ({
      isEditForm: !st.isEditForm
    }))
  }

  toggleEditComment() {
    this.setState(state => ({isEditingComment: !state.isEditingComment })) 
  }

  handleDelete(){
    const postId = this.props.match.params.id;
    this.props.removePostFromAPI(postId);
  }
  addComment(text) {
    const postId = this.props.match.params.id
    this.props.addCommentToAPI(text, postId)
    
  }


  handleUpdate(updatePost){
    const id = this.props.match.params.id;
    this.props.updatePostToAPI(id,updatePost)
  }
  render() {
    const post = this.props.post
    const id = this.props.match.params.id;
    if(!post){
      return <Redirect to="/"></Redirect>
    }

    return (
      <div className="PostDetails container">
        {this.state.isEditForm ? <EditPostForm
          handleUpdate={this.handleUpdate}
          toggleEditForm={this.toggleEditForm}
          {...post}
          id={id}/>:
        <div>
          <div>
            <div>
            <h1 className="d-inline  left" >{post.title}</h1>
              
              <i className="far fa-edit d-inline p-2 m-1 float-right PostIcon PostEdit" 
                onClick={this.toggleEditForm} />
              <i className="fas fa-times d-inline p-2 m-1 float-right PostIcon PostDelete"
              onClick={this.handleDelete} />

            </div>
          <div >
            <i className="d-inlin left" >{post.description}</i>
            <div className="d-inline p-2 m-1 float-right">
              < Vote className="d-inline p-8 m-30 float-right" postId={id}/>
              </div>
          </div>
            
            <br/><br/>
            {post.body}
            <div>
              tags:
            {post.tags.map( (tag) => (
              <i d-inline> {tag}</i>
            ))}
            </div>
          </div>
          <hr></hr>
          <h3>Comments</h3>
          {post.comments.map(comment => 
            <Comment text={comment.text}
            postId={id}
            id={comment.id}
            key={comment.id}
            toggleEditComment={this.toggleEditComment} />)}
          {!this.state.isEditingComment ? <CommentForm  addComment={this.addComment}/> : null}
        </div> 
        }      
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.id
  return {
    post: state.posts[postId],
  };
}

const mapDispatchToProps = {
  removePostFromAPI, 
  updatePostToAPI, 
  addCommentToAPI,
};

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails);




