import React from 'react';




const Carousel = () => (
  <div className="carousel-container">
      <div className="carousel">
        <img className="carousel-image" src="/images/carousel/imageslider1.jpg" />
          <img className="carousel-image hidden" src="/images/carousel/imageslider2.jpg" />
          <img className="carousel-image hidden" src="/images/carousel/imageslider3.jpg" />
          <img className="carousel-image hidden" src="/images/carousel/imageslider4.jpg" />
      </div>
    </div>
);

export default Carousel;
