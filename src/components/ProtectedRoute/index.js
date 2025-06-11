import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  return jwtToken ? <Route {...props} /> : <Redirect to="/login" />
}

export default ProtectedRoute
