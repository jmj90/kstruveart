import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
      window.scrollTo(0, 0)
  }

  innitalState = () => this.setState({ pressValue: true})

  removeProduct = (prodID) => {
    event.stopPropagation();
    const { removeProduct, product } = this.props;
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
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
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
                {
                  this.props.artist.filter(singleArtist => product.artistId === singleArtist.id)
                  .map(artist => (
                      <div className="product-title-name">{artist.fullname}</div>
                    )
                  )
                }
              <div className="product-view-title">
                <i>{ product.title }</i>,{' '}
                  <div className="product-view-category"> { product.year }</div>
                </div>
            </Link>
            <div className="product-view-category">
              {product.media}
            </div>
            <div className="product-view-category">
              {product.length} x {product.width} x {product.height} inches
            </div>
              <div className="product-description">
                { product.description.slice(0, 120) + '...' }
              </div>
              {
                Number(product.price) === 0 ?
                <div className="product-view-price">Contact For Price</div>
                :
                <div />
              }
              {
                product.isSold ?
                <div className="product-view-price">SOLD</div>
                :
              <div />
              }
              {
                Number(product.price) !== 0 && !(product.isSold) ?
                <div className="product-view-price">${ numberWithCommas(product.price / 100)}</div>
                :
                <div />
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
    pressValue: null,
    artist: state.artist
  }
}

const mapDispatchToProps = { removeProduct };



export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
