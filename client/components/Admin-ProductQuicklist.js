import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Parallax} from 'react-parallax'
import Nav from './Nav'
import Footer from './Footer'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SingleProduct from './SingleProduct';
import history from '../history'
import AdminToolbar from './AdminToolbar'
import _ from 'lodash'

class AdminProductQuicklist extends Component {

  render(){
    let filterSwitch;
    const {category} = this.props
    return (
      <div>
        <Nav />
        <div id="maincontent">
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
              <div id="artist-count-list">Product Quicklist</div>
                {this.getProducts()}
            </div>
        <Footer />
      </div>
    )
  }

  getProducts() {
    const {products, artistStyleCategoryId } = this.props
    let productList = this.props.products
    productList = _.sortBy(productList, "title")
    return (
      <div id="artist-quicklist">
        <div><b>Product Count:</b> {productList.length}</div>
      <div className="productsDisplay2">
        {
          productList ?
            productList.map(product =>
                <div key={product.id} className="product-tile">
                  <NavLink className="artist-name-list-quickview" to={`/products/${product.id}`}>
                    {product.title}
                  </NavLink>
                  <div id="spacer">------------</div>
                  {
                    this.props.artist.filter(singleArtist => product.artistId === singleArtist.id)
                    .map(artist => (
                        <div>
                        {artist.fullname}
                      </div>
                      )
                    )
                  }
                </div>
                )
                : <div />
             }
    </div>
  </div>
    )
  }
}

const mapStateToProps = ({ products, user, category, carts, artist }, ownProps) => {
  const productParamId = Number(ownProps.match.params.id);
  return {
    product: products.find(product => product.id === productParamId),
    products,
    user,
    category,
    carts,
    artist
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductQuicklist);
