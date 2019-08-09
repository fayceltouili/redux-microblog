import { ADD_POST,
         REMOVE_POST,
         UPDATE_POST,
         ADD_COMMENT,
         REMOVE_COMMENT,
         UPDATE_COMMENT,
         LOAD_POSTS,
         VOTE_POST,
         ERROR_IN_API
        }
          from "./actionTypes";
import axios from 'axios';


const BASE_URL= 'http://localhost:5000';

function errorInAPI(errorMessage) {
  return {
    type: ERROR_IN_API,
    errorMessage
  }
}

export function addPostToAPI(newPost) {
  return async function(dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/api/posts/`, newPost);
      const post = res.data
      const id = res.data.id
      delete post.id
      // console.log(post, id)
      post.comments = []
      dispatch(addPost(post, id));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
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
    try {
      await axios.delete(`${BASE_URL}/api/posts/${postId}`);
      dispatch(removePost(postId));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
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
    try {
      await axios.put(`${BASE_URL}/api/posts/${postId}`, updatedPost);
      dispatch(updatePost(postId, updatedPost));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  }
}
function updatePost(postId, updatedPost) {
  return {
    type: UPDATE_POST,
    postId,
    updatedPost
  };
}

export function addCommentToAPI(text, postId) {
  return async function(dispatch) {
    try {
      const res = await axios.post(`${BASE_URL}/api/posts/${postId}/comments`,{text});
      const comment = res.data
      dispatch(addComment(postId, comment));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  }
}
// `INSERT INTO comments (text, post_id) VALUES ($1, $2) 

function addComment(postId, comment) {
  return {
    type: ADD_COMMENT,
    comment,
    postId
  };
}

export function removeCommentFromAPI(commentId, postId) {
  return async function(dispatch) {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${postId}/comments/${commentId}`);
      dispatch(removeComment(commentId, postId));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  } 
}

function removeComment(commentId, postId) {
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
    let posts = {}
    for (let post of res.data) {
      const postRes = await axios.get(`${BASE_URL}/api/posts/${post.id}`)
      posts[post.id] = postRes.data
      delete post.id
    }
    
    dispatch(getPosts(posts));
  };
}
// normal action creator & action

function getPosts(posts) {
  return { type: LOAD_POSTS, posts };
}



export function votePostOnAPI(direction, postId) {
  return async function(dispatch) {
    let res = await axios.post(`${BASE_URL}/api/posts/${postId}/vote/${direction}`);
    
    dispatch(votePost(res.data.votes, postId));
    
  };
}
// normal action creator & action

function votePost(votes, postId) {
  return { 
    type: VOTE_POST,
     votes,
     postId
    }
  
}