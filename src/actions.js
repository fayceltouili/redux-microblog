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

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function removePost(postId) {
  return {
    type: REMOVE_POST,
    postId
  };
}

export function updatePost(postId, updatedPost) {
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

export function addComment(comment, commentId) {

  return {
    type: ADD_COMMENT,
    comment,
    commentId
  };
}

export function removeComment(commentId) {
  return {
    type: REMOVE_COMMENT,
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
      posts[post.id] = post
      delete post.id
    }
    dispatch(getPosts(posts));
  };
}

// normal action creator & action

function getPosts(posts) {
  return { type: LOAD_POSTS, posts };
}


