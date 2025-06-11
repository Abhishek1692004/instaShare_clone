import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserPost from '../UserPost'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SearchResults extends Component {
  state = {
    apiStatus: apiConstants.initial,
    searchResultsList: [],
  }

  componentDidMount() {
    this.onSearchResultsFetch()
  }

  onSearchResultsFetch = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {searchInput} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
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
          searchResultsList: updatedPostsData,
          apiStatus: apiConstants.success,
        })
      } else {
        this.setState({apiStatus: apiConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetrySearchResultsFetch = () => {
    this.onSearchResultsFetch()
  }

  onSuccessfulFetch = () => {
    const {searchResultsList} = this.state
    return searchResultsList.length !== 0 ? (
      <>
        <h1 className="search-text">Search Results</h1>
        <div className="results-container">
          {searchResultsList.map(post => (
            <UserPost key={post.postId} post={post} />
          ))}
        </div>
      </>
    ) : (
      <div className="no-search-results-container">
        <img
          src="https://res.cloudinary.com/dojo8unri/image/upload/v1749016933/Group_1_y4iilm.png"
          alt="search not found"
          className="no-search-img"
        />
        <h2>Search Not Found</h2>
        <p className="no-search-text">Try different keyword or search again</p>
      </div>
    )
  }

  onFailedFetch = () => (
    <div className="failed-fetch-container">
      <img
        src="https://res.cloudinary.com/dojo8unri/image/upload/v1748932608/Group_7522_v1bkzo.png"
        alt="failure view"
        className="profile-failed-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onRetrySearchResultsFetch}
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

  renderSearchResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.onSuccessfulFetch()
      case 'FAILURE':
        return this.onFailedFetch()
      case 'LOADING':
        return this.onLoadingFetch()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-results-container">
        {this.renderSearchResults()}
      </div>
    )
  }
}

export default SearchResults
