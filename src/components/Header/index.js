import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import './index.css'
//Header section
const Header = props => {
  const onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar-header">
      <div className="navbar-content">
        <Link to="/">
          <img
            className="navbar-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="navbar-menu">
          <Link to="/" className="navbar-menu-item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="navbar-menu-item">
            <li>Jobs</li>
          </Link>
          <li className="navbar-menu-item" ></li>
        </ul>
        <button
          type="button"
          className="navbar-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
