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
        {
          isLoggedIn ? (
            <div>
              <a href="/" className="Nav-Item-Footer">Home</a>
              <a className="Nav-Item-Footer" href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <Link to="/login" className="Nav-Item-Footer">Login</Link>
          )
        }
      </div>
      <a href="http://www.johnsonjake.com" id="Nav-Item-Admin-signature">site by jj.</a>
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
