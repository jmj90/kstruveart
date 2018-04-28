import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Lander,
  Artists,
  Catalogs,
  Category,
  Contact,
  AllProducts,
  ProductDetail,
  AdminAddProduct,
  AdminAddArtist,
  ArtistDetail,
  Construction,
  AllUsers,
  ResetPasswordPage,
  ResetPassword,
  Home
} from './components'
import SearchBar from './components/search'
import { me, fetchArtists, fetchCategories, fetchProducts} from './store'
import firebase from '../server/firebase'


class Routes extends Component {
  componentDidMount () {
    const {loadInitialData} = this.props
    const artistsThunk = fetchArtists()
    const categoryThunk = fetchCategories()
    const productsThunk = fetchProducts();
    loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props
    // const {isLoggedIn, userId, setActiveCart, setDefaultCart} = this.props

    let cookie = Number(document.cookie.slice(document.cookie.lastIndexOf('=') + 1))

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
         <Route exact path="/" component={Artists} />
      {/*   <Route exact path="/" component={Construction} /> */}
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/artists/:id" component={ArtistDetail} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/allproducts" component={AllProducts} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/category/:id" component={Category} />
        <Route exact path="/reset-password" component={ResetPassword} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/adminaddproduct" component={AdminAddProduct} />
              <Route exact path="/adminaddartist" component={AdminAddArtist} />
              <Route exact path="/adminusermanage" component={AllUsers} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Artists} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchArtists())
      dispatch(fetchProducts())
      dispatch(fetchCategories())
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
