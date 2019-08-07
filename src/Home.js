import React, {Component} from 'react';
import BlogpostCard from './BlogpostCard'
import './Home.css'

class Home extends Component {
  render() {
    const {posts} = this.props
    return (
      <div className="Home container">
        <p className="Home-welcome"> Welcome to <strong>Microblog</strong>, our innovative site for communication on the information superhighway</p>
        <div className="row">
          {Object.keys(posts).map(postKey => <BlogpostCard 
          key={postKey}
            id={postKey}
            title={posts[postKey].title}
            description={posts[postKey].description}
            />)}
        </div>
     
      </div>
    )
  }
}

export default Home

// import React, {Component} from 'react';
// //import './Home.css'

// class Home extends Component {
//   render() {
//     return (
//       <div className="Home">

//       </div>
//     )
//   }
// }

// export default Home