import React, {Component} from 'react';
import './App.css'
import Header from './Header'
import Routes from './Routes'
import slugify from 'slugify'
import { withRouter } from 'react-router-dom'


class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      posts : {
        test: {
          title: 'test',
          description: 'test',
          body: 'test'
        }
      }
    }
    this.addBlogPost = this.addBlogPost.bind(this);
    this.updateBlogPost = this.updateBlogPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  addBlogPost(newPost){
    let id = slugify(newPost.title)
    const postsCopy = {...this.state.posts, [id]: newPost }
    this.setState({posts: postsCopy})
  }

  updateBlogPost(updatedPost, oldId){
    const postsCopy = {...this.state.posts}
    delete postsCopy[oldId] 
    const id = slugify(updatedPost.title)
    postsCopy[id] = updatedPost
    this.setState({posts: postsCopy}, function() {
      this.props.history.push(`posts/${id}`) 
    })
  }
  deletePost(id){
    let postsCopy = {...this.state.posts}
    delete postsCopy[id];
    this.setState({posts: postsCopy})
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Routes addBlogPost={this.addBlogPost}
          updateBlogPost={this.updateBlogPost}
          deletePost={this.deletePost}
         posts={this.state.posts}
         />
      </div>
    )
  }
}

export default withRouter(App)