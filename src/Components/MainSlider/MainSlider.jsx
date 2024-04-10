import React from "react";
import Slider from "react-slick";

import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import blog1 from "../../assets/blog-img-1.jpeg";
import blog2 from "../../assets/blog-img-2.jpeg";
export default function MainSlider() {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div
        className="row gx-0 align-items-center mx-auto"
        style={{ maxWidth: "90vw" }}
      >
        <div className="col-md-9">
          <div className="slider-container">
            <Slider {...settings}>
              <img src={slide1} height={400} className="w-100" alt="slide1" />
              <img src={slide2} height={400} className="w-100" alt="slide2" />
              <img src={slide3} height={400} className="w-100" alt="slide3" />
            </Slider>
          </div>
        </div>
        <div className="col-md-3" style={{ maxWidth: "100vw" }}>
          <img src={blog1} className="w-100" height={200} alt="blog1" />
          <img src={blog2} className="w-100" height={200} alt="blog2" />
        </div>
      </div>
    </>
  );
}
