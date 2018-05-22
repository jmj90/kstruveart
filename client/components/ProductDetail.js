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
import _ from 'lodash'


class ProductDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedFile: 0,
        storageRef: 0,
        isSoldToggle: 0
      }
      this.editProductDetails = this.editProductDetails.bind(this);
      this.removeProduct = this.removeProduct.bind(this)
      this.addToCart = this.addToCart.bind(this)
      this.uploadProductPhoto = this.uploadProductPhoto.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this);
  }

  editProductImageForm() {
    return (
       //=========== product image ===========
      <div id="image-edit-uploader-section">
          {
           this.props.user.isAdmin && this.props.product ?
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
    )
  }

  editProductDetailsForm() {
    const {product} = this.props
    let artistArray = this.props.artist
    artistArray = _.sortBy(artistArray, 'lastname')

    return (
        this.props.user.isAdmin && this.props.product ? (
         <Form id="adminFormEditProduct" onSubmit={(event) => this.editProductDetails(event, product)}>
             <h4>Edit Product Details:</h4>

              <label>Artist</label>
              <select className="add-product-form-inputs"  name="artistId" type="text" placeholder="select an artist">
                  {
                    this.props.artist.filter(arty => arty.id === this.props.product.artistId)
                   .map(artyproduct =>
                   <option selected="selected" disabled value={artyproduct.id}> {artyproduct.fullname} </option>
                   )
                   }
                 {
                     this.props.artist.map(artistlist =>
                       <option value={artistlist.id}>{artistlist.fullname}</option>)
                 }
              </select>

              <label>Title</label>
              <input className="add-product-form-inputs" name="title" type="text" defaultValue={product.title} />

              <label>Year</label>
              <input className="add-product-form-inputs" name="year" type="number" defaultValue={product.year} />

              <label>Media</label>
              <input className="add-product-form-inputs" name="media" type="text" defaultValue={product.media} />

              <label> Dimensions: </label>
              <div id="dimensions-box">
                h: <input className="add-product-form-inputs-dimensions" name="height" type="number" defaultValue={product.height} />
                w:
                <input className="add-product-form-inputs-dimensions" name="width" type="number" defaultValue={product.width} />
                l:
                <input className="add-product-form-inputs-dimensions" name="length" type="number" defaultValue={product.length} />
                inches
              </div>

              <label>inventory Id #:</label>
              <input className="add-product-form-inputs" name="inventoryId" type="text" defaultValue={product.inventoryId} />

              <label>Price</label>
              <input name="price" type="number" type="decimal" defaultValue={product.price/100} />

              <label>Edition</label>
              <input className="add-product-form-inputs" name="edition" type="text" defaultValue={product.edition} />

              <label>Description</label>
              <textarea id="edit-product-desc" onChange={this.enterpressalert} name="desc" type="text" defaultValue={product.description} />

              <label>Product Type</label>
              <select className="add-product-form-inputs" name="producttype" type="text" required placeholder="Product Type">
                <option selected="selected" disabled> {product.producttype} </option>
                  <option value="book">Book</option>
                  <option value="catalog">Catalog</option>
                  <option value="original">Original</option>
                  <option value="painting">Print</option>
                  <option value="poster">Poster</option>
                  <option value="print">Print</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="other">Other</option>
                </select>

              <label>Inventory</label>
              <input name="inventory" type="number" defaultValue={product.inventory} />

              <label>Sold:</label>
              <select className="add-product-form-inputs" required name="isSoldSelect" type="text">
                {
                  product.isSold ?
                    <option selected>TRUE</option>
                  :
                    <option selected>FALSE</option>
                }
                {
                  product.isSold ?
                    <option>FALSE</option>
                  :
                    <option>TRUE</option>
                }
              </select>

             <label>Image Url</label>
             <input name="photoURL" type="text" defaultValue={product.photo} />

             <div className="edit-product-buttons">
               <Button color="blue" input type="submit"> Update Product </Button>
               <Button color="red" onClick={this.removeProduct}> Remove Product </Button>
             </div>

         </Form>
        ) :
       <div />
    )
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
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const {product} = this.props

    return (
      <div>
        <Nav />
        <div id="maincontent">
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
          <div className="single-product-view">
            {
              this.props.products.filter(product => product.id === this.props.product.id)
                .map(product => (
                    <div className="current-product" key={product.id}>
                      <img className="product-view-image" src={product.photo} onClick={()=>window.location.assign(`${product.photo}`)}/>
                      <div className="product-view-info">
                          {
                            this.props.product ?
                            this.props.artist.filter(singleArtist => product.artistId === singleArtist.id)
                            .map(artist => (
                              <div id="product-artist-container">
                                <NavLink to={`/artists/${artist.id}`}>
                                <div id="artist-name-link">{artist.fullname}</div>
                                </NavLink>
                                <div id="birthdeathyears">(b.{artist.birthYear} - d.{artist.deathYear})</div>
                              </div>
                              )
                            )
                            : <div />
                          }
                        <div className="product-view-title"> {product.title},
                            <div className="product-view-category"> {product.year} </div>
                          </div>
                          <div className="product-view-category">{product.media}</div>
                          {
                            product.length !== 0 ?
                          <div className="product-view-category">{product.height} x {product.width} x {product.length} inches </div>
                          :
                          <div className="product-view-category">{product.height} x {product.width} inches</div>
                          }
                          <div className="product-view-category">{product.inventoryId}</div>
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
                          <div className="product-view-price">${numberWithCommas(product.price / 100)}</div>
                          :
                          <div />
                        }
                        <div className="product-view-category">{product.edition}</div>
                      <div className="product-view-desc">{product.description}</div>
                        <div className="product-view-category">type:{' '}
                          {product.producttype}
                        </div>
                        {
                          product.inventory ?
                          <div>
                          <a href="mailto:keith@kstruve.com?subject=STRUVE FINE ART : PRODUCT INQUIRY">
                               <Button size="tiny" color="blue">inquire to purchase</Button>
                           </a>
                         </div>
                          :
                          <div />
                        }
                    </div>
                  </div>
                    )
                  )
                }
            </div>

              {this.editProductImageForm()}
              {this.editProductDetailsForm()}

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
    // var textarea = document.forms[0].desc.value
    // textarea = textarea.replace(/\r?\n/g, '<br />');
    const updatedproduct = Object.assign({}, product,
      {
        id: this.props.product.id,
        title: event.target.title.value,
        artistId: event.target.artistId.value,
        year: event.target.year.value,
        media: event.target.media.value,
        height: event.target.height.value,
        width: event.target.width.value,
        length: event.target.length.value,
        inventoryId: event.target.inventoryId.value,
        price: (event.target.price.value * 100),
        edition: event.target.edition.value,
        description: event.target.desc.value,
        producttype: event.target.producttype.value,
        inventory: event.target.inventory.value,
        isSold: event.target.isSoldSelect.value,
        photo: window.imageURLForProduct
      }
    )
    this.props.updateProduct(updatedproduct);
    window.location.reload()
  }

  handleInputChange(event) {
    let toggle = this.state.isSoldToggle
    if (toggle === 0 || false){
      console.log('sold toggle set to true')
      this.setState({isSoldToggle: true})
    } else {
      console.log('sold toggle set to false')
      this.setState({isSoldToggle: false})
    }

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
