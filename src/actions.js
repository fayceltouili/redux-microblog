import { ADD_POST,
         REMOVE_POST,
         UPDATE_POST,
         ADD_COMMENT,
         REMOVE_COMMENT,
         UPDATE_COMMENT,
         LOAD_POSTS }
          from "./actionTypes";
import axios from 'axios';


const BASE_URL= 'http://localhost:5000';

export function addPostToAPI(newPost) {
  return async function(dispatch) {
    const res = await axios.post(`${BASE_URL}/api/posts/`, newPost);
    const post = res.data
    const id = res.data.id
    delete post.id
    // console.log(post, id)
    post.comments = []
    dispatch(addPost(post, id));
  }
}

function addPost(post, id) {
  return {
    type: ADD_POST,
    post, 
    id
  };
}

export function removePostFromAPI(postId) {
  return async function(dispatch) {
    const res = await axios.delete(`${BASE_URL}/api/posts/${postId}`);
    
    dispatch(removePost(postId));
  }
}

function removePost(postId) {
  return {
    type: REMOVE_POST,
    postId
  };
}


export function updatePostToAPI(postId, updatedPost) {
  return async function(dispatch) {
    const res = await axios.put(`${BASE_URL}/api/posts/${postId}`, updatedPost);
    
    dispatch(updatePost(postId, updatedPost));
  }
}
function updatePost(postId, updatedPost) {
  return {
    type: UPDATE_POST,
    postId,
    updatedPost
  };
}

/**
 *  comment looks like 
 *  {
 *  text: 'text'
 *  postId: 'test-title'
 * }
 * commentId is a uuid
 */

export function addComment(comment, postId) {

  return {
    type: ADD_COMMENT,
    comment,
    postId
  };
}

export function removeComment(commentId, postId) {
  return {
    type: REMOVE_COMMENT,
    postId,
    commentId
  };
}

export function updateComment(id, updatedComment) {
  return {
    type: UPDATE_COMMENT,
    id,
    updatedComment
  };
}


export function getPostsFromAPI() {
  return async function(dispatch) {
    let res = await axios.get(`${BASE_URL}/api/posts/`);
    console.log('res..',res.data)
    let posts = {}
    for (let post of res.data) {
      const postRes = await axios.get(`${BASE_URL}/api/posts/${post.id}`)
      posts[post.id] = postRes.data
      delete post.id
    }
    console.log("posts...", posts)
    
    dispatch(getPosts(posts));
  };
}
// normal action creator & action

function getPosts(posts) {
  return { type: LOAD_POSTS, posts };
}


/**
 *       postComments = await axios.get(`${BASE_URL}/api/posts/${post.id}/comments`)
      postComments.reduce((acc, curr) => {
        curr.postId = post.id
        acc[curr.id] = curr
        delete curr.id
      }, comments)
      commentIds = postComments.map(comment => comment.id)
      post.comments = commentIds
 */