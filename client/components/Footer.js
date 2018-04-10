import React from 'react'
import { Search } from 'semantic-ui-react'
import history from '../history'
import { Link } from 'react-router-dom';
import SearchBar from './search'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'

let Footer = ({ handleClick, isLoggedIn }) => {


  return (
  <div id="footer">
        <div className="footer-nav">
          <a href="/artists"  className="Nav-Item"> artists </a>
          <a href="/catalogsbooksandprints" className="Nav-Item"> catalogs & books </a>
          {/* <Link to="/prints" className="Nav-Item"> prints </Link> */}
          <a href="/contact" className="Nav-Item"> contact </a>
        </div>
        <div id="footer-address"> 540 W Webster Ave, Suite 1111 | Chicago, IL 60614 | 312.560.4634 </div>
        <div id="footer-address"> [visits by appointment only] </div>
        <div id="admin-login-container">
        {
          isLoggedIn ? (
            <div>
              <a href="/" className="Nav-Item">Home</a>
              <a className="Nav-Item" href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <Link to="/login" className="Nav-Item-Admin">ADMIN LOGIN</Link>
          )
        }
        <a href="http://www.johnsonjake.com" id="Nav-Item-Admin-signature">Design by jj.</a>
      </div>
    </div>
  )
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
