import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

const LoginRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Redirect to="/" />
}

export default LoginRoute
