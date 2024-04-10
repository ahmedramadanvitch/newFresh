import React from "react";
import Slider from "react-slick";
import {
  categorySlider,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";

export default function CategorySlider() {
  let { data } = useCustomQuery("categorySlider", categorySlider);

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="row mt-4 mx-auto" style={{ maxWidth: "90vw" }}>
        <div className="col-12" style={{ maxWidth: "100vw" }}>
          <div className="slider-container">
            <Slider {...settings} className="w-100">
              {data?.data?.data?.map((item) => {
                return (
                  <div key={item._id} className="w-100">
                    <img
                      src={item.image}
                      height={180}
                      className="w-100"
                      alt={item.name}
                    />
                    <p className="text-center my-2 fs-5">{item.name}</p>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
