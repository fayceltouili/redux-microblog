import { ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT} from "./actionTypes";
const INITIAL_STATE = {
	posts: {
    test: {
      title: 'test',
      description: 'test',
      body: 'ttettest',
      comments: ['1234']
    }
  },
	comments: {'1234': {text: 'test', postId: 'test'}},
}

function rootReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_POST: {
      const postsCopy = {...state.posts}
			return {
        ...state,
        posts: {...postsCopy, ...action.post}
			}
		}
		case REMOVE_POST:{
      const postId = action.postId
      const postsCopy = {...state.posts};
      const commentsCopy = {...state.comments}
      for(let key of postsCopy[postId].comments) {
        delete commentsCopy[key]
      }
      delete postsCopy[action.postId]
			return {
        ...state,
        posts: postsCopy,
        comments: commentsCopy
      }
    }

    case UPDATE_POST:{
      const postsCopy = {...state.posts};
      postsCopy[action.postId] = {
        ...postsCopy[action.postId],
        title: action.updatedPost.title,
        description: action.updatedPost.description,
        body: action.updatedPost.body
      }
			return {
        ...state,
        posts: postsCopy
			}
    }
    
    case ADD_COMMENT: {
      console.log('ADD_COMMENT')
      const postId = action.comment.postId
      const postOfComment = state.posts[postId]
      return {
        ...state,
        comments: {
          ...state.comments, 
          [action.id]: action.comment
        },
        posts: {
          ...state.posts, 
          [postId]: {
            ...postOfComment,
            comments: [...postOfComment.comments, action.id]
          }
        }
      }
    }

    case REMOVE_COMMENT: {
      const postCopy = {...state.posts};
      const commentsCopy = {...state.comments}
      const postId = commentsCopy[action.commentId].postId
      const post = postCopy[postId];
      let commentsOfPost = post.comments;
      commentsOfPost = commentsOfPost.filter(id => id != action.commentId)
      delete commentsCopy[action.commentId]

      return {
        ...state,
        posts: postCopy,
        comments: commentsCopy
			}
    }

    case UPDATE_COMMENT: {
      return {
        ...state
			}
    }
		default:
			return state;
	}
  
}

export default rootReducer;
