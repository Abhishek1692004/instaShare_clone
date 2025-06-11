import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SearchResults from '../SearchResults'
import Header from '../Header'
import UserStories from '../UserStories'
import UserPost from '../UserPost'
import AppContext from '../AppContext'

const apiStoriesConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const apiPostsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    apiStoriesStatus: apiStoriesConstants.initial,
    apiPostsStatus: apiPostsConstants.initial,
    storiesList: [],
    postsList: [],
  }

  componentDidMount() {
    this.onUserStoriesFetch()
    this.onUserPostsFetch()
  }

  onUserStoriesFetch = async () => {
    this.setState({apiStoriesStatus: apiStoriesConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedStoriesData = data.users_stories.map(story => ({
          userId: story.user_id,
          userName: story.user_name,
          storyUrl: story.story_url,
        }))
        this.setState({
          storiesList: updatedStoriesData,
          apiStoriesStatus: apiStoriesConstants.success,
        })
      } else {
        this.setState({apiStoriesStatus: apiStoriesConstants.failure})
      }
    } catch {
      this.setState({apiStoriesStatus: apiStoriesConstants.failure})
    }
  }

  onUserPostsFetch = async () => {
    this.setState({apiPostsStatus: apiPostsConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedPostsData = data.posts.map(post => ({
          postId: post.post_id,
          userId: post.user_id,
          userName: post.user_name,
          profilePic: post.profile_pic,
          imageUrl: post.post_details.image_url,
          caption: post.post_details.caption,
          likesCount: post.likes_count,
          comments: post.comments.map(comment => ({
            userName: comment.user_name,
            userId: comment.user_id,
            comment: comment.comment,
          })),
          createdAt: post.created_at,
        }))
        this.setState({
          postsList: updatedPostsData,
          apiPostsStatus: apiPostsConstants.success,
        })
      } else {
        this.setState({apiPostsStatus: apiPostsConstants.failure})
      }
    } catch {
      this.setState({apiPostsStatus: apiPostsConstants.failure})
    }
  }

  onRetryStoriesFetch = () => {
    this.onUserStoriesFetch()
  }

  onRetryPostsFetch = () => {
    this.onUserPostsFetch()
  }

  onFailedStoriesFetch = () => (
    <div className="failed-fetch-container">
      <img
        src="https://res.cloudinary.com/dojo8unri/image/upload/v1748774560/alert-triangle_mycg2e.png"
        alt="failure view"
        className="failed-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onRetryStoriesFetch}
      >
        Try Again
      </button>
    </div>
  )

  onFailedPostsFetch = () => (
    <div className="failed-fetch-container">
      <img
        src="https://res.cloudinary.com/dojo8unri/image/upload/v1748774560/alert-triangle_mycg2e.png"
        alt="failure view"
        className="failed-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onRetryPostsFetch}
      >
        Try Again
      </button>
    </div>
  )

  onLoadingFetch = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderStories = () => {
    const {apiStoriesStatus, storiesList} = this.state
    switch (apiStoriesStatus) {
      case 'SUCCESS':
        return <UserStories storiesList={storiesList} />
      case 'FAILURE':
        return this.onFailedStoriesFetch()
      case 'LOADING':
        return this.onLoadingFetch()
      default:
        return null
    }
  }

  renderUserPosts = () => {
    const {apiPostsStatus, postsList} = this.state
    switch (apiPostsStatus) {
      case 'SUCCESS':
        return postsList.map(post => <UserPost key={post.postId} post={post} />)
      case 'FAILURE':
        return this.onFailedPostsFetch()
      case 'LOADING':
        return this.onLoadingFetch()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {searchPosts, displayStoriesAndPosts} = value
          return (
            <div className="home-bg-container">
              <Header />
              {displayStoriesAndPosts &&
                (searchPosts ? (
                  <SearchResults key={searchPosts} searchInput={searchPosts} />
                ) : (
                  <div className="try-search-container">
                    <img
                      src="https://res.cloudinary.com/dojo8unri/image/upload/v1749019955/Frame_1473_vxgifb.png"
                      alt="try search"
                      className="try-search-img"
                    />
                    <h2 className="try-search-text">
                      Search Results will be appear here
                    </h2>
                  </div>
                ))}
              {!displayStoriesAndPosts && (
                <div className="home-container">
                  {searchPosts ? (
                    <SearchResults
                      key={searchPosts}
                      searchInput={searchPosts}
                    />
                  ) : (
                    <>
                      <div className="slick-container">
                        {this.renderStories()}
                      </div>
                      <hr className="line-style-sm" />
                      <div className="user-posts-section">
                        {this.renderUserPosts()}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Home
