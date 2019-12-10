import axios from 'axios';
import{
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  LOAD_POSTS,
  LOAD_CATEGORIES,
  VOTE_POST,
  ERROR_IN_API
}
  from "./Constants";


const BASE_URL= process.env.REACT_APP_BASE_URL || 'https://microblogalog-backend.herokuapp.com/';

const  errorInAPI = errors => {
  return {
    type: ERROR_IN_API,
    errors
  }
}

export const addPostToAPI = newPost => {
  return async dispatch => {
    try {
      const res = await axios.post(`${BASE_URL}/api/posts/`, newPost);
      const post = res.data
      const id = res.data.id
      delete post.id
      post.comments = []
      dispatch(addPost(post, id));
    } catch(err) {
      dispatch(errorInAPI(err.message))
    }
  }
}

const addPost = (post, id) => {
  return {
    type: ADD_POST,
    post, 
    id
  };
}

export const removePostFromAPI = postId => {
  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${postId}`);
      dispatch(removePost(postId));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  }
}

const removePost = postId => {
  return {
    type: REMOVE_POST,
    postId
  };
}


export const updatePostToAPI = (postId, updatedPost) => {
  return async dispatch => {
    try {
      await axios.put(`${BASE_URL}/api/posts/${postId}`, updatedPost);
      dispatch(updatePost(postId, updatedPost));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  }
}
const updatePost = (postId, updatedPost) => {
  return {
    type: UPDATE_POST,
    postId,
    updatedPost
  };
}


export const addCommentToAPI = (text, postId) => {
  return async dispatch => {
    try {
      const res = await axios.post(`${BASE_URL}/api/posts/${postId}/comments/`, {text})
      dispatch(addComment(postId, res.data));
    } catch(err) {
      console.log(err)
      dispatch(errorInAPI(err.message))
    }
  }
}

// `INSERT INTO comments (text, post_id) VALUES ($1, $2) 

const addComment = (postId, comment) => {
  return {
    type: ADD_COMMENT,
    comment,
    postId
  };
}



export const removeCommentFromAPI = (commentId, postId) => {

  return async dispatch => {
    try {
      await axios.delete(`${BASE_URL}/api/posts/${postId}/comments/${commentId}`);
      dispatch(removeComment(commentId, postId));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  } 
}

const removeComment = (commentId, postId) => {
  return {
    type: REMOVE_COMMENT,
    postId,
    commentId
  };
}

export const updateCommentToAPI = (commentId, text, postId) => {
  return async dispatch => {
    try {
      await axios.put(`${BASE_URL}/api/posts/${postId}/comments/${commentId}`, {text});
      dispatch(updateComment(commentId, text, postId));
    } catch(err) {
      console.error(err)
      dispatch(errorInAPI(err.message))
    }
  } 
}
const updateComment = (commentId, text, postId) => {
  return {
    type: UPDATE_COMMENT,
    commentId,
    text,
    postId
  };
}


export const getPostsFromAPI = () =>{
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

const getPosts = posts => {
  return { type: LOAD_POSTS, posts };
}


export const getCategoriesFromAPI = () => {
  return async dispatch => {
    let res = await axios.get(`${BASE_URL}/api/categories/`);
    let categories = res.data

    dispatch(getCategories(categories))
  }
}

const getCategories = categories => {
  return { 
    type: LOAD_CATEGORIES,
    categories 
  };
}


export const votePostOnAPI = (direction, postId) => {
  return async dispatch => {
    let res = await axios.post(`${BASE_URL}/api/posts/${postId}/vote/${direction}`);
    
    dispatch(votePost(res.data.votes, postId));
    
  };
}

const votePost = (votes, postId) => {
  return { 
    type: VOTE_POST,
     votes,
     postId
    }
}
