import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import AppContext from '../AppContext'

class UserPost extends Component {
  state = {
    likeStatus: false,
  }

  onLikePost = () => {
    this.setState(
      prev => ({
        likeStatus: !prev.likeStatus,
      }),
      this.postLikeApiFetch,
    )
  }

  postLikeApiFetch = async () => {
    const {post} = this.props
    const {postId} = post
    const {likeStatus} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const requestDetails = {
      like_status: likeStatus,
    }
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      body: JSON.stringify(requestDetails),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.message)
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {searchToggle} = value
          const onHomeRoute = () => {
            searchToggle()
            // onDisplayToggle(false)
          }
          const {post} = this.props
          const {likeStatus} = this.state
          const {
            userId,
            userName,
            profilePic,
            imageUrl,
            caption,
            likesCount,
            comments,
            createdAt,
          } = post
          const likeIconDisplay = likeStatus ? (
            <FcLike size={24} />
          ) : (
            <BsHeart size={24} />
          )
          const likeCount = likeStatus ? likesCount + 1 : likesCount
          const testIdDisplay = likeStatus ? 'unLikeIcon' : 'likeIcon'
          const linkPath = `/users/${userId}`
          return (
            <div className="post-container">
              <div className="user-details">
                <img
                  src={profilePic}
                  alt="post author profile"
                  className="post-profile-pic"
                />
                <Link
                  to={linkPath}
                  className="link-style"
                  onClick={onHomeRoute}
                >
                  <p>{userName}</p>
                </Link>
              </div>
              <img src={imageUrl} alt="post" className="post-img" />
              <ul className="post-icons-container">
                <li key={1}>
                  <button
                    type="button"
                    className="icon-btn like-btn"
                    onClick={this.onLikePost}
                    testid={testIdDisplay}
                  >
                    {likeIconDisplay}
                  </button>
                </li>
                <li key={2}>
                  <button type="button" className="icon-btn comment-btn">
                    <FaRegComment size={24} />
                  </button>
                </li>
                <li key={3}>
                  <button type="button" className="icon-btn share-btn">
                    <BiShareAlt size={24} />
                  </button>
                </li>
              </ul>
              <div className="post-details">
                <p>{likeCount} likes</p>
                <p className="post-caption">{caption}</p>
                {comments.map(comment => (
                  <p className="post-comment" key={comment.userId}>
                    <span className="comment-username">{comment.userName}</span>{' '}
                    {comment.comment}
                  </p>
                ))}
                <p className="posted-time">{createdAt}</p>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default UserPost
