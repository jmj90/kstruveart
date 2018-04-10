import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="admin-signin">
      <img id="admin-logo" src="/images/mainlogo.png" />
      <div id="admin-portal-title"> ADMIN PORTAL </div>
      <div className="boundry-message">
        This login is for admins of the site.
        If you are not an admin, please use the link below to return home.
        Thank you!
        <div>
          <a href="/"> return home </a>
        </div>
      </div>
      <form id="auth-form" onSubmit={handleSubmit} name={name}>
        <div>
          <label className="login-label" htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label className="login-label" htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        {error && error.response && <div className="boundry-message"> {error.response.data} </div>}
        <div>
          <button id="login-button" type="submit">{displayName}</button>
        </div>
      </form>
      {/* <a id="google-button" href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
