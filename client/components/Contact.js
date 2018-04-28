import React, {Component} from 'react'
import {Parallax} from 'react-parallax'
import { connect } from 'react-redux';
import Nav from './Nav'
import Footer from './Footer'
import AdminToolbar from './AdminToolbar'

const textStyles = {
  background: 'none',
  padding: 20,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
};

class Contact extends Component {

  render(){
    return (
      <div>
        <Nav />
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
              <div id="maincontent">
                <div className="title">C O N T A C T</div>
                <div id="contact-viewport">
                <div className="contact-card">
                <div>Keith Struve</div>
                <div> 540 W Webster Ave, Suite 1111 </div>
                <div> Chicago, IL 60614 </div>
                <div id="footer-address"> [visits by appointment only] </div>
                <a href="mailto:keith@kstruve.com?subject=STRUVE FINE ART : General Contact">keith[at]kstruve.com</a>
                <div> 312.560.4634 </div>
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
    user: state.user
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
