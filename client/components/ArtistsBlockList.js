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

class ArtistsBlockList extends Component {

  getArtists(categoryId) {
    const {artist, artistStyleCategoryId } = this.props
    let artistList = this.props.artist
    artistList = _.sortBy(artistList, "lastname")

    return (
      <div className="artist-list-block-style">
        {
            artistList.map(singleartist =>
              <div key={singleartist.id} className="artist-block">
                <a href={`/artists/${singleartist.id}`}>
                  <div id="artist-photo-container">
                    <img id="artist-photo-list" src={singleartist.stylePhoto} />
                  </div>
                  <div className="artist-name-list-2">
                    {`${singleartist.firstname} ${singleartist.lastname}`}
                  </div>
              </a>
              </div>
            )
          }
      </div>
    )
  }

  handleClick(evt) {
    evt.preventDefault()
    history.push(`/category/${evt.target.name}`)
  }

  expandMenu(){
    let menuButton = document.getElementById("expand-btn")
    let el = document.getElementById("aristlist")
    if(menuButton.innerText == "COLLAPSE"){
      el.classList.remove("active")
      menuButton.innerText = "expand"
    }
    else {
    el.classList.add("active")
    menuButton.innerText = "collapse"
    }
  }

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
                <div className="title"> Artists </div>
                    {this.getArtists()}
              </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artist: state.artist,
    category: state.category,
    user: state.user
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsBlockList);
