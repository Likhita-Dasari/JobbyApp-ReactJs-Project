import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    //console.log(response)
    //console.log(data)
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
      this.setState({username: '', password: ''})
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  getUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="login-user-elements">
        <label className="login-userpara" htmlFor="username">
          USERNAME
        </label>
        <br />
        <input
          className="input-elements"
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  getPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="login-user-elements">
        <label className="login-userpara" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          className="input-elements"
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-background">
        <form className="login-form">
          <div>
            <img
              className="login-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          {this.getUsernameInput()}
          {this.getPasswordInput()}
          <button
            className="login-submit-button"
            type="submit"
            onClick={this.onSubmitLogin}
          >
            Login
          </button>
          {showErrorMsg ? <p className="error-msg">*{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
