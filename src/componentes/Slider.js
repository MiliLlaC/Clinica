import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slid1 from '../recursos/imagenes/slid1.jpg';
import slid2 from '../recursos/imagenes/slid2.jpg';
import slid3 from '../recursos/imagenes/slid3.jpg';
import './stile/slider.css';

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div className="slide">
        <img src={slid1} alt="Slide 1" />
      </div>
      <div className="slide">
        <img src={slid2} alt="Slide 2" />
      </div>
      <div className="slide">
        <img src={slid3} alt="Slide 3" />
      </div>
    </Slider>
  );
};

export default CustomSlider;
