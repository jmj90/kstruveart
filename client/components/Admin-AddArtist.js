'use strict';

import React, {Component} from 'react'
import Nav from './Nav.js'
import Footer from './Footer'
import { connect } from 'react-redux';
import { addArtist } from '../store/artist';
import { Form, Button } from 'semantic-ui-react'
import * as firebase from 'firebase';
import AdminToolbar from './AdminToolbar'

class AdminAddArtist extends Component {

constructor() {
  super()
  this.state = {
    selectedFile: 0,
    storageRef: 0,
    storageRefforStyle: 0,
    selectedFileforStyle: 0,
    isSoldToggle: false
  }

  this.uploadProfilePhoto = this.uploadProfilePhoto.bind(this)
  this.addNewArtist = this.addNewArtist.bind(this);
  this.uploadStylePhoto = this.uploadStylePhoto.bind(this);
}

componentDidMount() {
  this.imageUrl = false
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

  uploadProfilePhoto() {
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
              window.imageURLforProfilePhoto = url
            })
            .catch((error) => {
              console.error(error)
            })
        document.getElementById('progressPercent').innerHTML = 'Image successfully uploaded!'
        document.getElementById('image-upload-box').classList.add('uploaded')
      })

  }


  fileSelectHandlerForStylePhoto = event => {
    let file = event.target.files[0]
    let fbStorageRef = firebase.storage().ref('artist_images/' + file.name)

    this.setState((prevState, props) => ({
      selectedFileforStyle: file,
      storageRefforStyle: fbStorageRef
    }))

  }

  uploadStylePhoto() {
    let file = this.state.selectedFileforStyle
    let storageRef = this.state.storageRefforStyle
    let progressBar = document.getElementById('progressBar2')

    storageRef.put(file).on('state_changed',
      function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.value = percentage
        document.getElementById('progressPercent2').innerHTML = percentage + '%'
      },
      function error(err) {
        console.error(err)
        document.getElementById('progressPercent2').innerHTML = 'Uh Oh, Image upload failed! Please try again'
      },
      function complete(snapshot){

        console.log('Uploaded file!');

          storageRef.getDownloadURL()
            .then((url) => {
              // grabs and sets the url to a global variable to use outside of scope
              window.imageURLforStylePhoto = url
            })
            .catch((error) => {
              console.error(error)
            })
        document.getElementById('progressPercent2').innerHTML = 'Image successfully uploaded!'
        document.getElementById('image-upload-box2').classList.add('uploaded')
      })

  }

// ========================================================================== //


  addNewArtist(event, product) {
    event.preventDefault();

    const updatedArtist = Object.assign({}, product,
      {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        birthYear: event.target.birthYear.value,
        deathYear: event.target.deathYear.value,
        biography: event.target.biography.value,
        photo: window.imageURLforProfilePhoto,
        stylePhoto: window.imageURLforStylePhoto,
        artistStyleCategoryId: event.target.categorySelect.value,
        photoCredit: event.target.photoCred.value
      }
    )

    this.props.addArtist(updatedArtist);
  }


  render() {
    const { product } = this.props

    return (
      <div>
        <Nav />
        <div id="maincontent">
        <AdminToolbar />
                <div className="sub-title"> ADD AN ARTIST </div>
                <div id="add-product-viewport">
                <div className="add-product-card">
                <h5>add artist details:</h5>
                  {
                    this.props.user.isAdmin ?
                    <div>
                      <div id="image-upload-box">
                        <h5> Upload <u>Artist Profile</u> Image: </h5>
                        <p>This image will be displayed in the artist page section.</p>
                          <p>*this image should be a portrait of the artist</p>
                        <input id="upload-image-button" type="file" onChange={this.fileSelectHandler} />
                        <progress value="0" max="100" id="progressBar" />
                        <div id="progressPercent">0%</div>
                        {
                          this.state.storageRef === 0 ?
                          <Button disabled color="black" id="fileButton" onClick={this.uploadProfilePhoto}> Upload File </Button>
                          :
                          <Button color="green" id="fileButton" onClick={this.uploadProfilePhoto}> Upload File </Button>
                        }
                      </div>
                      <div id="image-upload-box2">
                        <h5> Upload <u>Artist List Style</u> Image: </h5>
                        <p>This image will be displayed in the artist list section</p>
                        <input id="upload-image-button2" type="file" onChange={this.fileSelectHandlerForStylePhoto} />
                        <progress value="0" max="100" id="progressBar2" />
                        <div id="progressPercent2">0%</div>
                        {
                          this.state.storageRefforStyle === 0 ?
                          <Button disabled color="black" id="fileButton2" onClick={this.uploadStylePhoto}> Upload File </Button>
                          :
                          <Button color="green" id="fileButton2" onClick={this.uploadStylePhoto}> Upload File </Button>
                        }
                      </div>
                    <form id="admin-add-product-form" onSubmit={(event) => this.addNewArtist(event, product)}>
                        <label className="form-label"> First Name: </label>
                        <input className="add-product-form-inputs" name="firstname" type="text" required placeholder="First Name" />

                        <label className="form-label"> Last Name: </label>
                        <input className="add-product-form-inputs" name="lastname" type="text" required placeholder="Last Name" />

                        <label className="form-label"> Birth Year: </label>
                        <input className="add-product-form-inputs" name="birthYear" type="number" defaultValue=" " placeholder="Birth Year" />

                        <label className="form-label"> Death Year: </label>
                        <input className="add-product-form-inputs" name="deathYear" type="number" defaultValue=" " placeholder="Death Year" />

                        <label className="form-label"> Category: </label>
                        <select className="add-product-form-inputs"  name="categorySelect" type="text" required>

                              <option selected="selected" disabled> Choose one </option>
                              {
                                this.props.category.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)
                              }
                            </select>

                        <label className="form-label"> Biography: </label>
                        <textarea id="product-description-input" className="add-product-form-inputs" name="biography" type="text" form="admin-add-product-form" placeholder="Enter description here..." />

                        <label className="form-label"> Photo Credit: </label>
                        <input className="add-product-form-inputs" name="photoCred" type="text" placeholder="photo credit" />

                        <Button color="blue" type="submit" id="submitButton" value="Submit"> Add Artist To List </Button>
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

const mapDispatchToProps = { addArtist };

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddArtist)
