import './App.css'
import {Component} from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import AppContext from './components/AppContext'

class App extends Component {
  state = {
    searchPosts: '',
    displayStoriesAndPosts: false,
    searchBtnDisplay: false,
  }

  onSearchPosts = searchInput => {
    if (searchInput) this.setState({searchPosts: searchInput})
    const {history, location} = this.props
    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  onSearchBtnSelectSM = onDisplayToggle => {
    this.setState(
      prevState => ({searchBtnDisplay: !prevState.searchBtnDisplay}),
      () => {
        const {searchBtnDisplay} = this.state
        onDisplayToggle(searchBtnDisplay)
      },
    )
    const {history, location} = this.props
    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  searchToggle = () => {
    this.setState(prevState => ({
      searchBtnDisplay: !prevState.searchBtnDisplay,
    }))
  }

  homeRoute = () => {
    this.setState({searchPosts: ''})
  }

  onDisplayToggle = booleanValue => {
    this.setState({displayStoriesAndPosts: booleanValue})
  }

  render() {
    const {searchPosts, displayStoriesAndPosts, searchBtnDisplay} = this.state
    return (
      <AppContext.Provider
        value={{
          searchPosts,
          displayStoriesAndPosts,
          searchBtnDisplay,
          searchToggle: this.searchToggle,
          onSearchBtnSelectSM: this.onSearchBtnSelectSM,
          onSearchPosts: this.onSearchPosts,
          homeRoute: this.homeRoute,
          onDisplayToggle: this.onDisplayToggle,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default withRouter(App)
