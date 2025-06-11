import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
  }

  onUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = error => {
    this.setState({errorMsg: error})
  }

  onLogin = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const checkAuthentication = Cookies.get('jwt_token')
    if (checkAuthentication) {
      return <Redirect to="/" />
    }
    const {usernameInput, passwordInput, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dojo8unri/image/upload/v1748704200/Illustration_e6kgkl.png"
          alt="website login"
          className="website-login"
        />
        <div className="login-form">
          <img
            src="https://res.cloudinary.com/dojo8unri/image/upload/v1748704666/Group_physwm.png"
            alt="website logo"
            className="website-logo"
          />
          <h2 className="webiste-name">Insta Share</h2>
          <form className="form-container" onSubmit={this.onLogin}>
            <label htmlFor="username" className="label-style">
              USERNAME
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={this.onUsernameInput}
              id="username"
              placeholder="Username"
              className="login-input"
            />
            <label htmlFor="password" className="label-style">
              PASSWORD
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={this.onPasswordInput}
              id="password"
              placeholder="Password"
              className="login-input"
            />
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
