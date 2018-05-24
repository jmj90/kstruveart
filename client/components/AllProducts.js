import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/products';
import { Form, Button } from 'semantic-ui-react'
import SingleProduct from './SingleProduct';
import Nav from './Nav'
import Footer from './Footer'
import AdminToolbar from './AdminToolbar'


/*
====== Structure Notes ======
• AllProducts: Renders all the products(<SingleProduct />)currently available
• SingleProduct: Single product components rendered in the AllProducts view
• ProductDetail: After clicking on a product, this is the view you see with product details
*/

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        <div id="maincontent">
        <div>
            { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
        </div>
        <div className="title"> Available Works </div>
          {this.getProducts()}
      </div>
        <Footer />
      </div>
    );
  }

  getProducts() {
    let productsArray = this.props.products
    productsArray = _.sortBy(productsArray, function(o) {
      return o.artist.lastname
    })

    return (
      <div className="productsDisplay">
        <div className="productView">
        {
          this.props.products ?
            productsArray.map(product => <SingleProduct key={product.id} product={product} />) : <div />
        }
      </div>
    </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    product: state.product,
    user: state.user,
    category: state.category
  }
}

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
