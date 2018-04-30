import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import Nav from './Nav'
import { Link, withRouter } from 'react-router-dom'
import Footer from './Footer'
import SingleProduct from './SingleProduct';
import AdminToolbar from './AdminToolbar'
import Carousel from './Carousel'

class Category extends Component {

  getArtists(categoryId) {
    categoryId = Number(categoryId)
    const {artist, artistStyleCategoryId } = this.props
    return (
      <div id="aristlist" className="active">
        {
          artist.filter(singleartist => singleartist.artistStyleCategoryId === categoryId).map(singleartist =>
            <div key={singleartist.id} className="artist-tile">
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
          </div>
        )
      }
    </div>
  )
}


  expandMenu(){
    let menuButton = document.getElementById("expand-btn")
    let el = document.getElementById("aristlist")
    if(Array.from(el.classList).includes("active")){
      menuButton.innerText = "COLLAPSE"
    }
    if(menuButton.innerText == "COLLAPSE"){
      el.classList.remove("active")
      menuButton.innerText = "expand"
    }
    else {
    el.classList.add("active")
    menuButton.innerText = "collapse"
    }
  }

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

  render(){
    const {categoires} = this.props
    return (
      <div>
        <Nav />
        <div id="maincontent">
        <div>
          { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
        </div>
        <Carousel />
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
                        categoires.map(artistcategory => (
                          <Link
                            to={`/category/${artistcategory.id}`}
                            className="category-filter"
                            key={artistcategory.id}>
                            {artistcategory.title}
                          </Link>
                        ))
                      }
                    </div>
                      <div id="expand-btn" onClick={() => this.expandMenu()}>collapse</div>
                   </div>
                    {this.getArtists(this.props.match.params.id)}
                  </div>
            </div>
            </div>
            {this.getProducts()}
        <Footer />
      </div>
    )
  }
}

/// CONTAINER ///

const mapStateToProps = (state) => {
  return {
    categoires: state.category,
    artist: state.artist,
    products: state.products,
    product: state.product,
    user: state.user
  }
}

const mapDispatch = {}

export default withRouter(connect(mapStateToProps, mapDispatch)(Category))
