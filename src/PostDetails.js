import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import EditPostForm from './EditPostForm';
import CommentForm from './CommentForm';
import Comment from './Comment'
import { removePost, updatePost, addComment } from './actions';
import { connect } from 'react-redux';
import './PostDetails.css'


class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
    }
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.addComment = this.addComment.bind(this)
  }

  toggleEditForm() {
    this.setState(st => ({
      isEditForm: !st.isEditForm
    }))
  }
  handleDelete(){
    const id = this.props.match.params.id;
    this.props.removePost(id);
  }
  addComment(comment, commentId) {
    comment.postId = this.props.match.params.id
    this.props.addComment(comment, commentId)
    
  }

  handleUpdate(updatePost){
    const id = this.props.match.params.id;
    this.props.updatePost(id,updatePost)
  }
  render() {
    const post = this.props.post
    const id = this.props.match.params.id;
    if(!post){
      return <Redirect to="/"></Redirect>
    }

    return (
      <div className="PostDetails container">
        {this.state.isEditForm ? <EditPostForm handleUpdate={this.handleUpdate} toggleEditForm={this.toggleEditForm} {...post} id={id}/>:
        <div>
          <div>

            <div>
            <h1 className="d-inline  left" >{post.title}</h1>
              <i className="far fa-edit d-inline p-2 m-1 float-right PostIcon PostEdit" 
                onClick={this.toggleEditForm} />
              <i className="fas fa-times d-inline p-2 m-1 float-right PostIcon PostDelete"
              onClick={this.handleDelete} />
            </div>

            <i>{post.description}</i>
            <br/><br/>
            <p>{post.body}</p>
          </div>
          <hr></hr>
          <h3>Comments</h3>
          {post.comments.map(key => <Comment id={key} key={key} />)}
          <CommentForm  addComment={this.addComment}/>
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

    // comments: state.posts[postId].map(commentId => state.comments[commentId])
  };
}

const mapDispatchToProps = {
  removePost, 
  updatePost, 
  addComment
};

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails);
