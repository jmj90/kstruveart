import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'
import {logout} from '../store'
import history from '../history'
import PropTypes from 'prop-types'

let AdminToolbar = ({ handleClick, isLoggedIn }) => {

    return (
      <div id="admin-toolbar">
        ADMIN TOOLBAR:
        <Link to="/adminaddProduct" className="Admin-Nav-Item"> add product </Link>
        <Link to="/adminaddArtist" className="Admin-Nav-Item"> add artist </Link>
        <Link to="/account-settings" className="Admin-Nav-Item"> account settings </Link>
        <Link to="/admin-artistquicklist" className="Admin-Nav-Item"> artist quick-list </Link>
        <Link to="/admin-productquicklist" className="Admin-Nav-Item"> product quick-list </Link>
        {/* <Link to="/adminusermanage" className="Admin-Nav-Item"> user management </Link> */}
          {
            isLoggedIn ? (
              <div>
                <a className="Admin-Nav-Item" href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <Link to="/login" className="Admin-Nav-Item">ADMIN LOGIN</Link>
            )
          }
      </div>
    );
  }

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(AdminToolbar)

AdminToolbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
