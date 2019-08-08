import { ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT} from "./actionTypes";
  import rootReducer from './rootReducer';

let action;
let state;

let post = {
  'testTitle': {
    title: 'testTitle',
    description: 'testDescription',
    body: 'testBody',
    comments: []
  }
}

it("is a function", function () {
  expect(typeof rootReducer).toEqual("function");
});

describe("ADD_POST", function () {
  beforeEach(function () {
    action = {
      type: ADD_POST,
      post: {
        title: 'testTitle',
        description: 'testDescription',
        body: 'testBody',
        comments: []
      }
    }
    state = { posts: {} }
  });

  it("should add a post to state.posts", function () {
    expect(rootReducer(state, action)).toEqual({posts: {
      title: 'testTitle',
      description: 'testDescription',
      body: 'testBody',
      comments: []
    }})
  });

  it("should be a pure function", function () {
    rootReducer(state, action)
    expect(state).toEqual({ posts: {} });
  });
});

describe("REMOVE_POST", function () {
  beforeEach(function () {
    action = {
      type: REMOVE_POST,
      postId: 'testTitle'
    }
    state = {
      posts: {
        'testTitle': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: []
        }
      },
      comments: {}
    }
  });

  it("should delete a post id from state.posts", function () {
    expect(rootReducer(state, action)).toEqual({ 
      posts: {}, 
      comments: {}
    });
  })
});

describe("UPDATE_POST", function () {
  beforeEach(function () {
    action = {
      type: UPDATE_POST,
      postId: 'testTitle',
      updatedPost: {
        title: 'testTitleUpdated',
        description: 'testDescriptionUpdated',
        body: 'testBodyUpdated',
      }
    }
    state = { 
      posts: {
        'testTitle': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: []
        }
      } 
    }
  });

  it("should add a post to state.posts", function () {
    expect(rootReducer(state, action)).toEqual({
      posts: {
        'testTitle': {
        title: 'testTitleUpdated',
        description: 'testDescriptionUpdated',
        body: 'testBodyUpdated',
        comments: []
        }
      }
    })
  });

  it("should be a pure function", function () {
    rootReducer(state, action)
    expect(state).toEqual({ 
      posts: {
        'testTitle': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: []
        }
      } 
    });
  });
});

describe("ADD_COMMENT", function () {
  beforeEach(function () {
    action = {
      type: ADD_COMMENT,
      comment: {
          text: 'testComment',
          postId: 'title'
      },
      commentId: '1234'
    }
    state = {
      posts: {
        'title': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: []
        }
      },
      comments: {}
    }
  });

  it("should add comment", function () {
    expect(rootReducer(state, action)).toEqual({ 
      posts: {
        'title': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: ['1234']
        }
      },
      comments: {
        '1234':{
          text: 'testComment',
          postId: 'title'
        }
      }
    });
  })
});


describe("REMOVE_COMMENT", function () {
  beforeEach(function () {
    action = {
      type: REMOVE_COMMENT,
      commentId: '1234'
    }
    state = {
      posts: {
        'title': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: ['1234']
        }
      },
      comments: {
        '1234':{
          text: 'testComment',
          postId: 'title'
        }
      }
    }
  });

  it("should delete comment", function () {
    expect(rootReducer(state, action)).toEqual({ 
      posts: {
        'title': {
          title: 'testTitle',
          description: 'testDescription',
          body: 'testBody',
          comments: []
        }
      },
      comments: {}  
    });
  })
});