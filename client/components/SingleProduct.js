import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProduct } from '../store/products';
import { Button } from 'semantic-ui-react'
import history from '../history'


class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    this.innitalState()
  }

  innitalState = () => this.setState({ pressValue: true})

  removeProduct = (prodID) => {
    event.stopPropagation();
    const { removeProduct, product } = this.props;

    console.log('this is the current product?: ', product.id, ' ', product.title)
    console.log('prodID', prodID)

    removeProduct(prodID);
  }

// =========== C U S T O M   D E L E T E  C O N F I R M =========== //

// current issue: passing correct product ID all the way though the chain
// need to write a promise chain inside removeProduct()
// and have all of this call in order

/*
  selectValue = (event) => {
    console.log('selectValue State ', this.state.pressValue)
    if (event.target.value === 'true'){
      this.removeProduct()
      document.getElementById('deletion-confirm-window').classList.remove('active')
    } else {
      document.getElementById('deletion-confirm-window').classList.remove('active')
    }
  }

  deleteConfirm = () => {
    event.stopPropagation();
    document.getElementById('deletion-confirm-window').classList.add('active')
    document.getElementById('deletion-question').classList.add('active')
    document.getElementById('remove-button-popup').classList.remove('disabled')
    document.getElementById('cancel-button-popup').classList.remove('disabled')
  }
  */

  // ================================================================ //

  render() {
    const { product } = this.props;
    return (
      <div>
        <div id="deletion-confirm-window">
          <div className="deletion-alert">
            <div id="deletion-question"> ARE YOU SURE YOU WANT TO REMOVE THIS PRODUCT? </div>
            <Button id="remove-button-popup" className="alert-buttons disabled" color="red" onClick={this.selectValue} value="true"> Remove Product </Button>
            <Button id="cancel-button-popup" className="alert-buttons disabled" onClick={this.selectValue} value="false"> Cancel </Button>
          </div>
         </div>
          <div className="product-card">
          <Link to={`/products/${product.id}`}>
            <img className="product-image" src={ product.photo } />
          </Link>
            <div className="product-info">
              <Link to={`/products/${product.id}`}>
              <div className="product-title">
                { product.title }
              </div>
            </Link>
              <div className="product-description">
                { product.description.slice(0,120) + '...' }
              </div>
          {
            product.inventory > 0 ? <div className="product-card-price">${+product.price / 100}</div>
            :
            <div id="productPrice">SOLD OUT</div>
          }
        </div>
          { this.props.user.isAdmin ?
            (
              <Button onClick={() => {this.removeProduct(product.id)} }>
                Remove
              </Button>
            ) : <div />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
    pressValue: null
  }
}

const mapDispatchToProps = { removeProduct };



export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
