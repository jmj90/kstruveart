import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import Nav from './Nav'
import AdminToolbar from './AdminToolbar'
import AccountForm from './UserAccountInfoForm'
import { Button, Form, Message } from 'semantic-ui-react'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, user} = props

  function updatePassword (userId, password) {
    axios.put(`/api/users/${ userId }`, { password, needsPasswordReset: false })
    .catch(err => console.error(err))
  }

  if (user.needsPasswordReset) {
    let newPassword = prompt('Your password has expired. Please provide a new password to reset it and click OK.')
    while (newPassword === null) {
      newPassword = prompt('You must enter a new password to proceed. Please provide a new password and click OK.')
    }
    updatePassword(user.id, newPassword)
  }


  return (
    <div id="maincontent">
      <Nav />
            { user.isAdmin ? <AdminToolbar /> : <div /> }
        <div id="account-settings-container">
          <h3>User Account Information</h3>
          <AccountForm />
        </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
