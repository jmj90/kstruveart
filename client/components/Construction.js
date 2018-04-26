import React, { Component } from 'react';

class Construction extends Component {

  render(){
    return (
      <div id="offline-lander">
        <img id="navlogo-offline" src="/images/mainlogo2.png" />
        <div id="offline-header">server offline</div>
        <div></div>
        <div id="offline-message">
          We are currently undergoing some scheduled maintenance.
          We will be back online shortly.
          Thank you for your patience!
        </div>
      </div>
    )
  }

}


export default Construction;
