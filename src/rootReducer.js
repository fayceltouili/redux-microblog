import { ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  LOAD_POSTS} from "./actionTypes";
const INITIAL_STATE = { 
  posts: {}, 
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
      const postId = action.postId
      const postsCopy = {...state.posts};
      // const commentsCopy = {...state.comments}
      // console.log(postsCopy, commentsCopy)
      // for(let commentKey of postsCopy[postId].comments) {
      //   delete commentsCopy[commentKey]
      // }
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
              action.commentId
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
            comments: [...state.posts[action.postId].comments.filter(comment => comment.id !== action.commentId)]
          }
        }
      }
    }

    case UPDATE_COMMENT: {
      return {
        ...state
			}
    }
    case LOAD_POSTS:{
      return{
        ...state,
        posts: action.posts
      }
    }
		default:
			return state;
	}
  
}

export default rootReducer;




// const INITIAL_STATE = {
// 	posts: {
//     test: {
//       title: 'test',
//       description: 'test',
//       body: 'ttettest',
//       comments: ['1234']
//     }
//   },
// 	comments: {
//     '1234': {
//       text: 'test',
//        postId: 'test'
//       }
//   }
// }