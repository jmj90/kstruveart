import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from './Nav'
import Footer from './Footer'
import { updateArtist, addArtist, removeArtist } from '../store/artist';
import { addCategory } from '../store/category'
import { Button } from 'semantic-ui-react'
import history from '../history'
import AdminToolbar from './AdminToolbar'
import SingleProduct from './SingleProduct';
import * as firebase from 'firebase';


class ArtistDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedFile: 0,
        storageRef: 0,
        storageRefforStyle: 0,
        selectedFileforStyle: 0,
      }
      this.editArtistDetails = this.editArtistDetails.bind(this);
      this.removeArtist = this.removeArtist.bind(this)
      this.createACategory = this.createACategory.bind(this)
      this.addToCart = this.addToCart.bind(this)
      this.uploadProfilePhoto = this.uploadProfilePhoto.bind(this)
      this.uploadStylePhoto = this.uploadStylePhoto.bind(this);
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

getProducts() {
  return (
    <div className="productsDisplay">
      <div className="productView">
      {
        this.props.products ?
          this.props.products
            .map(product => <SingleProduct key={product.id} product={product} />) : <div />
      }
    </div>
  </div>
  )
}


  render() {
    const {category, artistselected} = this.props
    return (
      <div>
        <Nav />
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
        <div id="maincontent">
          <div className="single-artist-view">

            {/*   A R T I S T   I N F O   A R E A   */}

            {
              this.props.artist.filter(singleArtist => singleArtist.id === this.props.artistselected.id)
                .map(singleArtist => (
                    <div className="current-artist" key={singleArtist.id}>
                      <div className="artist-view-info">
                        <div className="artist-name-bio">
                        <div className="artist-view-title"> {singleArtist.fullname} </div>
                        <div className="artist-view-bio">{singleArtist.biography}</div>
                        <div className="artist-view-category">category:{' '}
                        </div>
                      </div>
                        <img className="artist-view-image" src={singleArtist.photo} />
                    </div>

                    {/* =========== artist profile image =========== */}
                    <div id="image-edit-uploader-section">
                        {
                         this.props.user.isAdmin && artistselected ?
                          <div>
                          <h4>edit artist images</h4>
                            <div id="image-upload-box3">
                              <div> Update <u>Artist Profile</u> Image: </div>
                              <input id="upload-image-button" type="file" onChange={this.fileSelectHandler} />
                              <div id="progressPercent">0%</div>
                                {
                                 this.state.storageRef === 0 ?
                                  <Button disabled color="black" id="fileButton" onClick={this.uploadProfilePhoto}> Upload File </Button>
                                  :
                                  <Button color="green" id="fileButton" onClick={this.uploadProfilePhoto}> Upload File </Button>
                                }
                              </div>
                              </div>
                              :
                            <div />
                        }

                        {/* =========== artist style image =========== */}

                        {
                          this.props.user.isAdmin && artistselected ?
                            <div id="image-upload-box3">
                              <div> Update <u>Artist Style</u> Image: </div>
                              <input id="upload-image-button" type="file" onChange={this.fileSelectHandlerForStylePhoto} />
                              <div id="progressPercent2">0%</div>
                                {
                                  this.state.storageRefforStyle === 0 ?
                                  <Button disabled color="black" id="fileButton2" onClick={this.uploadStylePhoto}> Upload File </Button>
                                  :
                                  <Button color="green" id="fileButton2" onClick={this.uploadStylePhoto}> Upload File </Button>
                                }
                              </div>
                              :
                            <div />
                        }
                      </div>
                    {
                      this.props.user.isAdmin && artistselected ? (
                       <form id="adminFormEditArtist" onSubmit={(event) => this.editArtistDetails(event, artistselected)}>
                           <h4>Edit Artist Details:</h4>
                            <label>First Name</label>
                            <input name="firstname" type="text" defaultValue={artistselected.firstname} />
                            <label>Last Name</label>
                            <input name="lastname" type="text" defaultValue={artistselected.lastname} />
                            <label>Biography</label>
                            <textarea id="edit-artist-bio" name="bio" type="text" defaultValue={artistselected.biography} />
                            <label>Profile Image Url</label>
                            <input name="photoURL" type="text" defaultValue={artistselected.photo} />

                             <label>Style Image Url</label>
                             <input name="stylephotoURL" type="text" defaultValue={artistselected.stylePhoto} />
                             <label>Category</label>
                             <select name="category" type="text">
                             {
                                 this.props.category.map(cat =>
                                   <option value={cat.id}>{cat.title}</option>)
                             }
                               </select>
                          <div className="edit-artist-buttons">
                           <Button id="update-artist-btn" input color="blue" type="submit"> Update Artist </Button>
                           <Button color="red"  onClick={this.removeArtist}> Remove Artist </Button>
                          </div>
                       </form>
                      ) :
                     <div />
                    }
                    <Link id="back-to-artist-button" to={`/artists`}>
                      back to all artists
                    </Link>
                      </div>
                    )
                  )
                }
            </div>

              {/*   A R T I S T   P R O D U C T S  / A R T W O R K   A R E A   */}
              <div className="title">Artists Items</div>


            {
              this.props.products && this.props.artistselected ?
              this.props.products.filter(product => product.artistId === this.props.artistselected.id)
              .map(product =>
                (<div key={product.id} className="artist-product-card">
                <Link to={`/products/${product.id}`}>
                  <img className="product-image-artist-view" src={ product.photo } />
                </Link>
                  <div className="artist-product-info">
                    <Link to={`/products/${product.id}`}>
                    <div className="artist-product-title">
                      { product.title }
                    </div>
                  </Link>
                    <div className="artist-product-description">
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
                      <div className="product-view-price">${+product.price / 100}</div>
                      :
                      <div />
                    }
              </div>
                { this.props.user.isAdmin ?
                  (
                    <Button onClick={() => {this.removeArtist(product.id)} }>
                      Remove
                    </Button>
                  ) : <div />
                }
              </div>)
            )
            :
            <div />
            }
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
  removeArtist(event) {
    const { removeArtist, artistselected } = this.props;
    event.stopPropagation();
    removeArtist(artistselected.id);
    history.push('/')
  }

  // ========= Admin: Edit Product ========= \\
  editArtistDetails(event, product) {
    event.preventDefault();
    let profilePhoto = window.imageURLforProfilePhoto
    let stylePhoto = window.imageURLforStylePhoto
    const updatedArtist = Object.assign({}, product,
      {
        id: this.props.artistselected.id,
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        biography: event.target.bio.value,
        photo: profilePhoto,
        stylePhoto: stylePhoto,
        artistStyleCategoryId: event.target.category.value
      }
    )
    this.props.updateArtist(updatedArtist);
    window.location.reload()
  }

  // ========= Admin: Create Category ========= \\
  createACategory(event) {
    event.preventDefault();
    const category = {
      id: this.props.category.id,
      categoryName: event.target.category.value,
    };
    this.props.addCategory(category);
    event.target.category.value = '';
  }

}

const mapStateToProps = ({ artist, products, user, category, carts }, ownProps) => {
  const artistParamId = Number(ownProps.match.params.id);
  return {
    artistselected: artist.find(artistselected => artistselected.id === artistParamId),
    products,
    user,
    category,
    artist,
    carts
  };
}

const mapDispatchToProps = { addArtist, updateArtist, removeArtist, addCategory };

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
