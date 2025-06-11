import React from 'react'

const AppContext = React.createContext({
  searchPosts: '',
  displayStoriesAndPosts: false,
  searchBtnDisplay: false,
  searchToggle: () => {},
  onSearchBtnSelectSM: () => {},
  onSearchPosts: () => {},
  homeRoute: () => {},
  onDisplayToggle: () => {},
})

export default AppContext
