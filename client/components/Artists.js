import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Parallax} from 'react-parallax'
import Nav from './Nav'
import Footer from './Footer'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SingleProduct from './SingleProduct';
import history from '../history'
import AdminToolbar from './AdminToolbar'
import Carousel from './Carousel'
import _ from 'lodash'

class Artists extends Component {

  carousel (){
    let counter = 0;
    const carouselImages = document.querySelectorAll('.carousel-image');
    setInterval(() => {
      if(carouselImages[counter]){
        carouselImages[counter].classList.add('hidden');
        counter++;
      }
      if (counter === 4){
        counter = 0;
      }
      if(carouselImages[counter]){
      carouselImages[counter].classList.remove('hidden')
    }
    }, 5500)
  }

  getArtists(categoryId) {
    const {artist, artistStyleCategoryId } = this.props
    let artistList = this.props.artist
    artistList = _.sortBy(artistList, "lastname")

    return (
      <div id="aristlist" className="active">
        {
          categoryId ?
          artistList.filter(singleartist => singleartist.artistStyleCategoryId === categoryId).map(singleartist =>
            (<div key={singleartist.id} className="artist-tile">
              <a href={`/artists/${singleartist.id}`}>
              <div id="artist-title-bar-name-photo">
                <div className="artist-name-list">
                  {`${singleartist.firstname} ${singleartist.lastname}`}
                </div>
                <img id="artist-photo-list" src={singleartist.stylePhoto} />
              </div>
              <div className="artist-bio-list">
                {singleartist.biography}
              </div>
            </a>
          </div>)
          )
            :
            artistList.map(singleartist =>
              (<div key={singleartist.id} className="artist-tile">
                <a href={`/artists/${singleartist.id}`}>
                <div id="artist-title-bar-name-photo">
                  <div className="artist-name-list">
                    {`${singleartist.firstname} ${singleartist.lastname}`}
                  </div>
                  <div id="artist-photo-container">
                    <img id="artist-photo-list" src={singleartist.stylePhoto} />
                  </div>
                </div>
                <div className="artist-bio-list">
                  {singleartist.biography}
                </div>
              </a>
              </div>)
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
        {this.carousel()}
        {this.expandMenu()}
        <div id="maincontent">
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
                <div className="title">A R T I S T S</div>
                <div id="artist-scroller-div">
                  <div id="filter-list">
                    <div className="scroll-list-title">
                      <div id="filter-selection">Filter:
                        <Link
                          className="category-filter"
                          name={'allCat'}
                          to={`/artists`}
                          key={'allCat1'}
                          >
                          ALL
                        </Link>
                      {
                        (
                        filterSwitch ?
                        category.map(artistcategory => (
                          <Link
                            className="category-filter"
                            name={artistcategory.id}
                            to={`/category/${artistcategory.id}`}
                            key={artistcategory.id}
                            >
                            {artistcategory.title}
                          </Link>
                        ))
                        :
                        category.map(artistcategory => (
                          <Link
                            className="category-filter"
                            name={artistcategory.id}
                            to={`/category/${artistcategory.id}`}
                            key={artistcategory.id}
                            >
                            {artistcategory.title}
                          </Link>
                        ))
                      )
                      }
                      </div>
                      <div id="expand-btn" onClick={() => this.expandMenu()}>collapse</div>
                   </div>
                   {
                   filterSwitch ?
                    this.getArtists(filterSwitch)
                    :
                    this.getArtists()
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
    artist: state.artist,
    category: state.category,
    user: state.user
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
