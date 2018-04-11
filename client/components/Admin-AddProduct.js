'use strict';

import React, {Component} from 'react'
import Nav from './Nav.js'
import Footer from './Footer'
import { connect } from 'react-redux';
import { addProduct } from '../store/products';
import { Form, Button } from 'semantic-ui-react'
import * as firebase from 'firebase';
import AdminToolbar from './AdminToolbar'

class AdminAddProduct extends Component {

constructor() {
  super()
  this.state = {
    selectedFile: 0,
    storageRef: 0,
    isSoldToggle: false
  }
  this.uploadFile = this.uploadFile.bind(this)
  this.addNewProduct = this.addNewProduct.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
}

componentDidMount() {
  this.imageUrl = false
}

handleInputChange(event) {
  let toggle = this.state.isSoldToggle
  if (toggle === false){
    console.log('sold toggle set to true')
    this.setState({isSoldToggle: true})
  } else {
    console.log('sold toggle set to false')
    this.setState({isSoldToggle: false})
  }

}

// ==================== I M A G E  U P L O A D E R ==================== //

  fileSelectHandler = event => {
    let file = event.target.files[0]
    let fbStorageRef = firebase.storage().ref('product_images/' + file.name)

    this.setState((prevState, props) => ({
      selectedFile: file,
      storageRef: fbStorageRef
    }))

  }

  uploadFile() {
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
              window.imageURLforThing = url
            })
            .catch((error) => {
              console.error(error)
            })
        document.getElementById('progressPercent').innerHTML = 'Image successfully uploaded!'
        document.getElementById('image-upload-box').classList.add('uploaded')
      })

  }

// ========================================================================== //


  addNewProduct(event, product) {
    event.preventDefault();

    const updatedproduct = Object.assign({}, product,
      {
        title: event.target.title.value,
        description: event.target.desc.value,
        producttype: event.target.producttype.value,
        price: (event.target.price.value * 100),
        saleType: event.target.saletype.value,
        inventory: event.target.inventory.value,
        isSold: this.state.isSoldToggle,
        photo: window.imageURLforThing,
        artistId: event.target.artistSelect.value
      }
    )
    console.log(updatedproduct)
    this.props.addProduct(updatedproduct);
  }

  render() {
    const { product } = this.props

    return (
      <div>
        <Nav />
        <AdminToolbar />
        <div id="maincontent">
                <div className="sub-title"> ADD A PRODUCT </div>
                <div id="add-product-viewport">
                <div className="add-product-card">
                <h5>add product details:</h5>
                  {
                    this.props.user.isAdmin ?
                    <div>
                      <div id="image-upload-box">
                        <h5> Upload Product Image: </h5>
                        <input id="upload-image-button" type="file" onChange={this.fileSelectHandler} />
                        <progress value="0" max="100" id="progressBar" />
                        <div id="progressPercent">0%</div>
                        {
                          this.state.storageRef === 0 ?
                          <Button disabled color="black" id="fileButton" onClick={this.uploadFile}> Upload File </Button>
                          :
                          <Button color="green" id="fileButton" onClick={this.uploadFile}> Upload File </Button>
                        }
                      </div>
                    <form id="admin-add-product-form" onSubmit={(event) => this.addNewProduct(event, product)}>
                        <label className="form-label"> Title: </label>
                        <input className="add-product-form-inputs" name="title" type="text" required placeholder="Product title" />
                        <label className="form-label"> Artist </label>
                        <select className="add-product-form-inputs"  name="artistSelect" type="text" placeholder="select an artist">
                          <option selected="selected" disabled> Choose one </option>
                          <option value="none">None</option>
                          {
                            this.props.artist.map(artist => <option key={artist.id} value={artist.id}>{artist.fullname}</option>)
                          }
                        </select>
                        <label className="form-label"> Description: </label>
                        <textarea id="product-description-input" className="add-product-form-inputs" name="desc" type="text" form="admin-add-product-form" placeholder="Enter description here..." />
                        <label className="form-label"> Product Type: </label>
                        <select className="add-product-form-inputs" name="producttype" type="text" required placeholder="Product Type">
                          <option selected="selected" disabled> Choose one </option>
                            <option value="book">Book</option>
                            <option value="catalog">Catalog</option>
                            <option value="original">Original</option>
                            <option value="poster">Poster</option>
                            <option value="print">Print</option>
                            <option value="other">Other</option>
                          </select>
                        <label className="form-label"> Price: </label>
                        <input className="add-product-form-inputs" name="price" type="decimal" placeholder="Enter price: format('999.99')" />
                        <label className="form-label"> Sale Type: </label>
                          <select className="add-product-form-inputs" name="saletype" type="text" required>
                            <option selected="selected" disabled> Choose one </option>
                              <option value="Online Order">Online Order</option>
                              <option value="Contact For Sale">Contact For Sale</option>
                              <option value="Other">Other</option>
                          </select>
                        <label className="form-label"> Inventory: </label>
                        <input className="add-product-form-inputs"  name="inventory" type="number" required placeholder="Enter inventory" />
                          <label className="form-label"> SOLD:
                            <input
                              type="checkbox"
                              name="issold"
                              value="off"
                              onChange={this.handleInputChange} />
                          </label>
                        <Button color="blue" type="submit" id="submitButton" value="Submit"> Add Item To Inventory </Button>
                      </form>
                      </div>
                    :
                    <div />
                  }
              </div>
              </div>
            </div>
            <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    product: state.product,
    user: state.user,
    category: state.category,
    artist: state.artist
  }
}

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct)