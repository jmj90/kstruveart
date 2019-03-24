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

class Privacy extends Component {

  render(){
    return (
      <div>
        <Nav />
        <div id="maincontent">
          <div>
              { this.props.user.isAdmin ? <AdminToolbar /> : <div /> }
          </div>
                <div id="contact-viewport-policy">
                  <br />
                  <br />
                  <h1>PRIVACY POLICY</h1>
                    <p>
                      STRUVE FINE ART, is committed to keeping any and all personal information
                      collected of those individuals that visit our website and make use of our
                      online facilities and services accurate, confidential, secure and private.
                      Our privacy policy has been designed and created to ensure those affiliated
                      with STRUVE FINE ART of our commitment and realization of our obligation not
                      only to meet but to exceed most existing privacy standards.
                      <br /><br />
                      THEREFORE, this Privacy Policy Agreement shall apply to STRUVE FINE ART ,
                      and thus it shall govern any and all data collection and usage thereof.
                      Through the use of www.kstruve.com you are herein consenting to the following
                      data procedures expressed within this agreement.

                      <h3>Unsubscribe or Opt-Out</h3>
                      All users and/or visitors to our website have the option to discontinue receiving communication from us and/or reserve the right to discontinue receiving communications by way of email or newsletters. To discontinue or unsubscribe to our website please send an email that you wish to unsubscribe to keith@kstruve.com. If you wish to unsubscribe or opt- out from any third party websites, you must go to that specific website to unsubscribe and/or opt-out.
                      <h3> Links to Other Web Sites </h3>
                      Our website does contain links to affiliate and other websites.STRUVE FINE ART does not claim nor accept responsibility for any privacy policies, practices and/or procedures of other such websites. Therefore, we encourage all users and visitors to be aware when they leave our website and to read the privacy statements of each and every website that collects personally identifiable information. The aforementioned Privacy Policy Agreement applies only and solely to the information collected by our website.

                      <h3> Security </h3>
                      STRUVE FINE ART shall endeavor and shall take every precaution to maintain adequate physical, procedural and technical security with respect to our offices and information storage facilities so as to prevent any loss, misuse, unauthorized access, disclosure or modification of the user's personal information under our control.
                      <h3> Changes to Privacy Policy Agreement </h3>
                      STRUVE FINE ART reserves the right to update and/or change the terms of our privacy policy, and as such we will post those change to our website homepage at www.kstruve.com, so that our users and/or visitors are always aware of the type of information we collect, how it will be used, and under what circumstances, if any, we may disclose such information. If at any point in time STRUVE FINE ART decides to make use of any personally identifiable information on file, in a manner vastly different from that which was stated when this information was initially collected, the user or users shall be promptly notified by email. Users at that time shall have the option as to whether or not to permit the use of their information in this separate manner.
                      <h3> Acceptance of Terms </h3>
                      Through the use of this website, you are hereby accepting the terms and conditions stipulated within the aforementioned Privacy Policy Agreement. If you are not in agreement with our terms and conditions, then you should refrain from further use of our sites. In addition, your continued use of our website following the posting of any updates or changes to our terms and conditions shall mean that you are in agreement and acceptance of such changes.
                      <h3> How to Contact Us </h3>
                      If you have any questions or concerns regarding the Privacy Policy Agreement related to our website, please feel free to contact us at the following email, telephone number or mailing address.
                      <br />
                      Email: keith@kstruve.com
                      <br />
                      Mailing Address:
                      <br />
                      STRUVE FINE ART
                      <br />
                      540 W Webster Ave Apt 1111 Chicago, Illinois 60614
                    </p>
                    <h1> ADA COMPLIANCE </h1>
                    <p>
                      STRUVE FINE ART is committed to making its website accessible to all people, including individuals with disabilities.
                      We are in the process of making sure our website, www.kstruve.com, complies with best practices and standards as
                      defined by Section 508 of the U.S. Rehabilitation Act and Level AA of the World Wide Web Consortium (W3C) Web Content
                      Accessibility Guidelines 2.0. These guidelines explain how to make web content more accessible for people with disabilities,
                      which will help make the web more user-friendly for all people.
                      <br /><br />
                      If you would like additional assistance or have accessibility concerns, please contact us at (312)560-4634 or keith@kstruve.com.
                      <br /><br />
                    </p>
                <center>
                  <br />
                </center>
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

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
