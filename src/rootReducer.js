import { ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  VOTE_POST,
  LOAD_POSTS,
  ERROR_IN_API} from "./actionTypes";


const INITIAL_STATE = { 
  posts: {}, 
  errorMessage: ''
}


function rootReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ADD_POST: {
      console.log('ADD_POST')

      const postsCopy = {...state.posts}
			return {
        ...state,
        posts: {
          ...postsCopy, 
          [action.id]: action.post
        }
			}
		}
		case REMOVE_POST:{
      console.log('REMOVE_POST')
      const postsCopy = {...state.posts};

      delete postsCopy[action.postId]
			return {
        ...state,
        posts: postsCopy,
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
      // console.log('ADD_COMMENT')
      const post = state.posts[action.postId]
      return {
        ...state,
        posts: {
          ...state.posts, 
          [action.postId]: {
            ...post,
            comments: [
              ...post.comments, 
              action.comment
            ]
          }
        }
      }
    }

    case REMOVE_COMMENT: {
      console.log('DELETE_COMMENT')
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.postId]: {
            ...state.posts[action.postId],
            comments: [...state.posts[action.postId].comments
              .filter(comment => comment.id !== action.commentId)]
          }
        }
      }
    }


    // case UPDATE_COMMENT: {
    //   return {
    //     ...state
		// 	}
    // }
    case LOAD_POSTS:{
      return{
        ...state,
        posts: action.posts
      }
    }

    case VOTE_POST:{
      console.log(action.postId, state.posts[action.postId])
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.postId]: {
            ...state.posts[action.postId],
            votes: action.votes
          }
          
        }
      }
    }

    case ERROR_IN_API: {
      return {
        ...state,
        errorMessage: action.errorMessage
      }
    }
		default:
			return state;
	}
  
}

export default rootReducer;