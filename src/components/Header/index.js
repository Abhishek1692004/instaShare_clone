import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'
import AppContext from '../AppContext'

class Header extends Component {
  state = {
    searchInput: '',
    hamburgerSelect: false,
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onHamburgerSelect = () => {
    this.setState({hamburgerSelect: true})
  }

  onCloseHamburgerList = () => {
    this.setState({hamburgerSelect: false})
  }

  /*
  onSearchBtnSelect = () => {
    this.setState(prevState => ({
      searchBtnDisplay: !prevState.searchBtnDisplay,
    }))
  }
  */

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {
            onSearchPosts,
            homeRoute,
            onDisplayToggle,
            searchToggle,
            searchBtnDisplay,
            onSearchBtnSelectSM,
          } = value
          const {location} = this.props
          const isActive = path =>
            location.pathname === path ? 'active-style' : ''
          const searchStyle = searchBtnDisplay ? 'active-style' : ''
          const onHomeRoute = () => {
            homeRoute()
            if (searchBtnDisplay) searchToggle()
            onDisplayToggle(false)
            const {history} = this.props
            history.push('/')
          }
          const profilePage = () => {
            homeRoute()
            if (searchBtnDisplay) searchToggle()
            onDisplayToggle(false)
          }
          const logoutBtn = () => {
            Cookies.remove('jwt_token')
            const {history} = this.props
            history.replace('/login')
          }

          const {searchInput, hamburgerSelect} = this.state
          /*
          const removeHamburgerListDisplay = !hamburgerSelect
            ? 'remove-hamburger-list'
            : ''
          const removeSearchBtnDisplay = !searchBtnDisplay
            ? 'remove-search'
            : ''
            */
          return (
            <div className="header-section">
              <div className="header-container">
                <div className="website-logo-container">
                  <Link to="/" className="link-style" onClick={onHomeRoute}>
                    <img
                      src="https://res.cloudinary.com/dojo8unri/image/upload/v1748704666/Group_physwm.png"
                      alt="website logo"
                      className="header-website-logo"
                    />
                  </Link>
                  <h2 className="header-website-name">Insta Share</h2>
                </div>
                <ul className="header-list">
                  <li className="search-container">
                    <input
                      type="search"
                      value={searchInput}
                      onChange={this.onSearchInput}
                      className="search-input"
                      placeholder="Search Caption"
                    />
                    <button
                      type="button"
                      className="search-btn"
                      testid="searchIcon"
                      onClick={() => onSearchPosts(searchInput)}
                    >
                      <FaSearch />
                    </button>
                  </li>
                  <li>
                    <Link to="/" className="link-style" onClick={onHomeRoute}>
                      <p className={isActive('/')}>Home</p>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-profile" className="link-style profile-style">
                      <h3 className={isActive('/my-profile')}>Profile</h3>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={this.onLogout}
                      className="link-style"
                    >
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={logoutBtn}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="hamburger-icon-btn"
                  onClick={this.onHamburgerSelect}
                >
                  <GiHamburgerMenu size={24} />
                </button>
              </div>
              {hamburgerSelect && (
                <ul className="hamburger-icon-list">
                  <li>
                    <Link to="/" className="link-style" onClick={onHomeRoute}>
                      <p className={searchBtnDisplay ? '' : isActive('/')}>
                        Home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="search-caption-btn link-style"
                      onClick={() => onSearchBtnSelectSM(onDisplayToggle)}
                    >
                      <p className={searchStyle}>Search</p>
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      className="link-style"
                      onClick={profilePage}
                    >
                      <p className={isActive('/my-profile')}>Profile</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={this.onLogout}
                      className="link-style"
                    >
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={logoutBtn}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={this.onCloseHamburgerList}
                      className="close-btn"
                    >
                      <IoIosCloseCircle />
                    </button>
                  </li>
                </ul>
              )}
              {searchBtnDisplay && (
                <div className="search-container-sm">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={this.onSearchInput}
                    className="search-input-sm"
                    placeholder="Search Caption"
                  />
                  <button
                    type="button"
                    className="search-btn"
                    testid="searchIcon"
                    onClick={() => onSearchPosts(searchInput)}
                  >
                    <FaSearch />
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default withRouter(Header)
