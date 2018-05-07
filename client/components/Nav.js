import React from 'react'
import { Search } from 'semantic-ui-react'
import history from '../history'
import { Link } from 'react-router-dom';
import SearchBar from './search'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'

let Nav = ({ handleClick, isLoggedIn }) => {

  return (
    <div>
      <div id="version">v1.29</div>
      <div className="Nav-Nav">
        <img id="navlogo" src="/images/mainlogo4.png" />
        <a href="/artists"  className="Nav-Item"> artists </a>
        <a href="/allproducts" className="Nav-Item"> artwork </a>
        <a href="/contact" className="Nav-Item"> contact </a>
        <div className="Nav-Item">
          <div id="searchcontainer">
        <SearchBar id="navbarsearch" fluid={true} />
        </div>
        </div>
        <div id="nav-seperator" />
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Nav)

Nav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
