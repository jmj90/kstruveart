import React from 'react'
import {Parallax} from 'react-parallax'
import Nav from './Nav.js'
import Footer from './Footer'

const textStyles = {
  background: 'none',
  padding: 20,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)'
};

let Catalogs = () => {

  return (
    <div>
      <Nav />
        <div className="client-list">
          <Parallax
            bgHeight={'100%'}
            id="catalogs-parallax"
            bgImage={'/images/studioimages/gallery3.jpg'}
            strength={200}>
            <div id="maincontent">
              <div className="title">C A T A L O G S</div>
            </div>
          </Parallax>
          <Footer />
        </div>
      {/*
      <div className="parallax-container">
        <Parallax
          bgImage={"/images/studioimages/mainsetup.jpg"}
          strength={200}>
          <div style={{height: "100vh"}}>
            <div style={textStyles}>
              <div className="title">services</div>

              <div className="service-card">R E C O R D I N G</div>
              <div className="service-card">P R O D U C I N G</div>
              <div className="service-card">M I X I N G</div>
              <div className="service-card">M A S T E R I N G</div>
              <div className="service-card">S O N G  W R I T I N G</div>

            </div>
          </div>
        </Parallax>
      </div>
      <div className="client-list">
        <Parallax
          bgHeight={'100%'}
          id="studioneon"
          bgImage={'/images/studioimages/blacklogo_2.jpg'}
          strength={200}>
          <div id="header">
            <div className="title">clients</div>
          </div>
        </Parallax>
      </div>
      <div className="gear-list">
        <Parallax
          id="studioneon"
          bgImage={'/images/studioimages/rackgear.jpg'}
          strength={200}>
          <div id="header">
            <div className="title">gear</div>
          </div>
        </Parallax>
      </div>
      */}
    </div>
  )
}

export default Catalogs
