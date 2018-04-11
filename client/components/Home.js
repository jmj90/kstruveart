import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {

  render(){
    return (
      <div id="home-lander">
        <img id="lander-navlogo" src="/images/mainlogo2.png" />
        <div className="lander-nav">
          <a href="/artists"  className="Nav-Item"> artists </a>
          <a href="/allproducts" className="Nav-Item"> artwork </a>
          {/*<Link to="/prints" className="Nav-Item"> prints </Link>*/}
          <a href="/contact" className="Nav-Item"> contact </a>
        </div>
        <div id="home-address"> 540 W Webster Ave, Suite 1111 | Chicago, IL 60614 </div>
        <div id="home-address"> [visits by appointment only] </div>
        <div id="home-address"> 312.560.4634 </div>
      </div>
    )
  }
}

const mapStateToProps = ({ artist }) => ({ artist });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
