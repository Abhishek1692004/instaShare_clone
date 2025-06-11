import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiConstants.initial,
    profileDetailsList: [],
  }

  componentDidMount() {
    this.profileFetch()
  }

  profileFetch = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const jwtToken = Cookies.get('jwt_token')
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
        const user = data.user_details
        const updatedData = {
          id: user.id,
          userId: user.user_id,
          userName: user.user_name,
          profilePic: user.profile_pic,
          followersCount: user.followers_count,
          followingCount: user.following_count,
          userBio: user.user_bio,
          postsCount: user.posts_count,
          posts: user.posts,
          stories: user.stories,
        }
        this.setState({
          profileDetailsList: updatedData,
          apiStatus: apiConstants.success,
        })
      } else {
        this.setState({apiStatus: apiConstants.failure})
      }
    } catch {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetryUserProfileFetch = () => {
    this.profileFetch()
  }

  onSuccessfullFetch = () => {
    const {profileDetailsList} = this.state
    const {
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      postsCount,
      posts,
      stories,
    } = profileDetailsList
    const profileImgAlt = 'user profile'
    const storyImgAlt = 'user story'
    const postImgAlt = 'user post'
    return (
      <>
        <div className="profile-details">
          <p className="user-name-sm">{userName}</p>
          <div className="profile-info">
            <img
              src={profilePic}
              alt={profileImgAlt}
              className="user-profile-img"
            />
            <div className="details-section">
              <h1 className="user-name">{userName}</h1>
              <div className="followers-container">
                <div className="follow-container">
                  <p className="span-style">{postsCount}</p>
                  <p className="follow-section-para">posts</p>
                </div>
                <div className="follow-container">
                  <p className="span-style">{followersCount}</p>
                  <p className="follow-section-para">followers</p>
                </div>
                <div className="follow-container">
                  <p className="span-style">{followingCount}</p>
                  <p className="follow-section-para">following</p>
                </div>
              </div>
              <p className="user-id">{userId}</p>
              <p className="user-bio">{userBio}</p>
            </div>
          </div>
          <h4 className="user-id-sm">{userId}</h4>
          <h4 className="user-bio-sm">{userBio}</h4>
          <ul className="stories-container">
            {stories.map(story => (
              <li key={story.id}>
                <img
                  src={story.image}
                  alt={storyImgAlt}
                  className="user-story-img"
                />
              </li>
            ))}
          </ul>
          <hr className="user-line-style" />
          <div className="post-icon-container">
            <BsGrid3X3 size={24} />
            <h1 className="posts">Posts</h1>
          </div>
        </div>
        {posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map(post => (
              <li key={post.id}>
                <img src={post.image} alt={postImgAlt} className="post-image" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-posts-container">
            <div className="camera-container">
              <BiCamera size={24} />
            </div>
            <h1 className="no-posts">No Posts</h1>
          </div>
        )}
      </>
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
        onClick={this.onRetryUserProfileFetch}
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

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.onSuccessfullFetch()
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
      <div className="profile-bg-container">
        <Header />
        <div className="profile-container">{this.renderProfile()}</div>
      </div>
    )
  }
}

export default UserProfile
