import './index.css'

const NotFound = props => {
  const homePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="notfound-container">
      <img
        src="https://res.cloudinary.com/dojo8unri/image/upload/v1749111666/erroring_1_vjqhzw.png"
        alt="page not found"
        className="notfound-img"
      />
      <h2>Page Not Found</h2>
      <p className="notfound-text">
        We are sorry, the page you requested could not be found.Please go back
        to the home page.
      </p>
      <button type="button" onClick={homePage} className="home-page-link">
        Home Page
      </button>
    </div>
  )
}

export default NotFound
