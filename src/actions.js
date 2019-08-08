import { ADD_POST,
         REMOVE_POST,
         UPDATE_POST,
         ADD_COMMENT,
         REMOVE_COMMENT,
         UPDATE_COMMENT} from "./actionTypes";

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

export function addComment(comment, id) {

  return {
    type: ADD_COMMENT,
    comment,
    id
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



