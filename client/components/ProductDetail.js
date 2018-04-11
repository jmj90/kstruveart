import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Nav from './Nav'
import Footer from './Footer'
import { updateProduct, addProduct, removeProduct } from '../store/products';
import { addCategory } from '../store/category'
import { Button, Form, Select } from 'semantic-ui-react'
import history from '../history'
import AdminToolbar from './AdminToolbar'
import * as firebase from 'firebase';


class ProductDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedFile: 0,
        storageRef: 0
      }
      this.editProductDetails = this.editProductDetails.bind(this);
      this.removeProduct = this.removeProduct.bind(this)
      this.addToCart = this.addToCart.bind(this)
      this.uploadProductPhoto = this.uploadProductPhoto.bind(this)
  }

  // ==================== I M A G E  U P L O A D E R ==================== //

    fileSelectHandler = event => {
      let file = event.target.files[0]
      let fbStorageRef = firebase.storage().ref('artist_images/' + file.name)

      this.setState((prevState, props) => ({
        selectedFile: file,
        storageRef: fbStorageRef
      }))

    }

    uploadProductPhoto() {
      let file = this.state.selectedFile
      let storageRef = this.state.storageRef
      let progressBar = document.getElementById('progressBar')

      storageRef.put(file).on('state_changed',
        function progress(snapshot) {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressBar.value = percentage
          document.getElementById('progressPercent').innerHTML = percentage + '%'
        },
        function error(err) {
          console.error(err)
          document.getElementById('progressPercent').innerHTML = 'Uh Oh, Image upload failed! Please try again'
        },
        function complete(snapshot){

          console.log('Uploaded file!');

            storageRef.getDownloadURL()
              .then((url) => {
                // grabs and sets the url to a global variable to use outside of scope
                window.imageURLForProduct = url
              })
              .catch((error) => {
                console.error(error)
              })
          document.getElementById('progressPercent').innerHTML = 'Image successfully uploaded!'
          document.getElementById('image-upload-box').classList.add('uploaded')
        })

    }

  // ========================================================================== //

  enterpressalert(e){
    var code = e.keyCode || e.which
    if (code == 13) {
      document.getElementById("edit-product-desc").value = document.getElementById("edit-product-desc").value + '\n';
    }
  }


  render() {
    const {product} = this.props
    return (
      <div>
        <Nav />
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
        <div id="maincontent">
          <div className="single-product-view">
            {
              this.props.products.filter(product => product.id === this.props.product.id)
                .map(product => (
                    <div className="current-product" key={product.id}>
                      <img className="product-view-image" src={product.photo} onClick={()=>window.location.assign(`${product.photo}`)}/>
                      <div className="product-view-info">
                        <div className="product-view-title"> {product.title} </div>
                        <div className="product-view-desc">{product.description}</div>
                        <div className="product-view-artist">
                          {
                            this.props.artist.filter(singleArtist => product.artistId === singleArtist.id)
                            .map(artist => (
                              <div>
                                <div>Artist:</div>
                                <NavLink to={`/artists/${artist.id}`}>
                                <div id="artist-name-link">{artist.fullname}</div>
                              </NavLink>
                            </div>
                              )
                            )
                          }
                        </div>
                        <div className="product-view-category">category:{' '}
                          {product.producttype}
                        </div>
                        {
                          product.isSold ?
                          <div className="product-view-price">SOLD</div>
                          :
                          <div className="product-view-price">${+product.price / 100}</div>
                        }
                        {
                          product.inventory ?
                          <a href="mailto:keith@kstruve.com?subject=STRUVE FINE ART : PRODUCT INQUIRY">
                               <Button size="tiny" color="blue">inquire to purchase</Button>
                           </a>
                          :
                          <div />
                        }
                    </div>
                  </div>
                    )
                  )
                }
            </div>
            {/* =========== product image =========== */}
            <div id="image-edit-uploader-section">
                {
                 this.props.user.isAdmin && product ?
                  <div>
                  <h4>edit product image</h4>
                    <div id="image-upload-box3">
                      <div> Update <u>Product</u> Image: </div>
                      <input id="upload-image-button" type="file" onChange={this.fileSelectHandler} />
                      <div id="progressPercent">0%</div>
                        {
                         this.state.storageRef === 0 ?
                          <Button disabled color="black" id="fileButton" onClick={this.uploadProductPhoto}> Upload File </Button>
                          :
                          <Button color="green" id="fileButton" onClick={this.uploadProductPhoto}> Upload File </Button>
                        }
                      </div>
                      </div>
                      :
                    <div />
                }
              </div>
            {
              this.props.user.isAdmin && product ? (
               <Form id="adminFormEditProduct" onSubmit={(event) => this.editProductDetails(event, product)}>
                   <h4>Edit Product Details:</h4>
                     <label>Title</label>
                     <input name="title" type="text" defaultValue={product.title} />
                     <label>Description</label>
                     <textarea id="edit-product-desc" onChange={this.enterpressalert} name="desc" type="text" defaultValue={product.description} />
                     <label>Price</label>
                     <input name="price" type="number" type="decimal" defaultValue={product.price/100} />
                     <label>Inventory</label>
                     <input name="inventory" type="number" defaultValue={product.inventory} />
                     <label>Image Url</label>
                     <input name="photoURL" type="text" defaultValue={product.photo} />
                  <div className="edit-product-buttons">
                   <Button color="blue" input type="submit"> Update Product </Button>
                   <Button color="red" onClick={this.removeProduct}> Remove Product </Button>
                  </div>
               </Form>
              ) :
             <div />
            }
            <div id="back-to-products-btn">
              <NavLink to={`/products`}>
              <div color="red">
                back to all products
              </div>
              </NavLink>
            </div>
          </div>
          <Footer />
        </div>
      );
    }


  // ========= Add To Cart ========= \\
  addToCart(event){
    event.preventDefault();
    const quantity = event.target.productQuantity.value
    const cartId = this.props.carts[0].id
    const product = this.props.product
    this.props.addItemToCartThunkCreator(cartId, product, quantity);
    // event.target.productQuantity.value = '1';
  }

  // ========= Admin: Remove Product ========= \\
  removeProduct(event) {
    const { removeProduct, product } = this.props;
    event.stopPropagation();
    removeProduct(product.id);
    history.push('/')
  }

  // ========= Admin: Edit Product ========= \\
  editProductDetails(event, product) {
    event.preventDefault();
    const updatedproduct = Object.assign({}, product,
      {
        id: this.props.product.id,
        title: event.target.title.value,
        description: event.target.desc.value,
        price: (event.target.price.value * 100),
        inventory: event.target.inventory.value,
        photo: window.imageURLForProduct
      }
    )
    this.props.updateProduct(updatedproduct);
    window.location.reload()
  }

  // ========= Admin: Create Category ========= \\

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

const mapDispatchToProps = { addProduct, updateProduct, removeProduct, addCategory };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);