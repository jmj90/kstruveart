import React, { Component } from 'react'
import { Search, Menu, Segment, activeItem } from 'semantic-ui-react'
import history from '../history'
import { Link } from 'react-router-dom';
import SearchBar from './search'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'

export class Footer extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { isLoggedIn, handleClick } = this.props
  return (
    <div id="footer">
      <div className="footer-nav">
        <a href="/artists"  className="Nav-Item-Footer"> Artists </a>
        <a href="/allproducts" className="Nav-Item-Footer"> Artwork </a>
        <a href="/contact" className="Nav-Item-Footer"> Contact </a>
        <a href="/privacy-policy" className="Nav-Item-Footer"> Policies </a>
        {
          isLoggedIn ? (
            <div id="user-nav">
              <a href="/account-settings" className="Nav-Item-Footer">Account Settings</a>
              <a className="Nav-Item-Footer" href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div id="user-nav">
              <Link to="/login" className="Nav-Item-Footer">Login</Link>
            </div>
          )
        }
        <a href="http://www.johnsonjake.com" id="Nav-Item-Admin-signature" rel="noopener noreferrer" target="_blank">site by jj.</a>
      </div>
    </div>
  )
}
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

export default connect(mapState, mapDispatch)(Footer)

Footer.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
