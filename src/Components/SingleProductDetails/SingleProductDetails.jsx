import React from "react";
import { useParams } from "react-router-dom";
import {
  WishListArray,
  singleProductDetails,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  addToCart,
  addToWishList,
  removeFromWishList,
  useCustomMutation,
} from "../../QueryFunctions/useMutationFunctions";

import Slider from "react-slick";

export default function SingleProductDetails() {
  // Slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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

  // add product to cart
  let { mutate, isLoading: addToCartLoading } = useCustomMutation(addToCart);

  // wishList Array To get Data
  let { data: wishListData, isLoading: wishListLoading } = useCustomQuery(
    "WishListArray",
    WishListArray
  );

  // add to wishList
  let { mutate: mutateAddWishList, isLoading: addToWishListLoading } =
    useCustomMutation(addToWishList);

  // remove from wishList
  let { mutate: mutateRemoveWishList, isLoading: removeFromWishListLoading } =
    useCustomMutation(removeFromWishList);

  // get id of element you clicked on bu useParams and get id from url
  let { id } = useParams();

  let { data, isLoading, error, isError } = useCustomQuery(
    "singleProductDetails",
    () => singleProductDetails(id)
  );

  if (
    isLoading ||
    addToCartLoading ||
    addToWishListLoading ||
    wishListLoading ||
    removeFromWishListLoading
  ) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div className="row align-items-center my-5">
        <div className="col-md-5" style={{ maxWidth: "100vw" }}>
          <div className="slider-container">
            <Slider {...settings} className="w-100">
              {data?.data?.data?.images.map((item) => (
                <div key={item} className="w-100">
                  <img
                    src={item}
                    height={600}
                    className="mb-2 w-100 object-fit-cover"
                    alt={item}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="col-md-7 p-3 ">
          <h1 className="h3 mb-4">{data?.data?.data?.title}</h1>
          <p className="text-secondary"> {data?.data?.data?.description} </p>
          <p className="lead  text-main"> {data?.data?.data?.category.name} </p>
          <div className="d-flex justify-content-between align-items-center text-black">
            <span className="fw-bold">{data?.data?.data?.price} EGP</span>
            <span>
              {data?.data?.data?.ratingsQuantity}{" "}
              <i className="fa-solid fa-star rating-color mx-1"></i>{" "}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center my-3">
            <button
              onClick={() => {
                mutate(data?.data?.data?._id);
              }}
              className="btn bg-main text-white w-75"
            >
              Add To Cart
            </button>

            <i
              className="fa-solid fa-heart mx-2 fs-5 cursor-pointer"
              style={
                wishListData?.data?.data.some(
                  (ele) => ele._id === data?.data?.data?._id
                )
                  ? { color: "red" }
                  : { color: "unset" }
              }
              onClick={() => {
                !wishListData?.data?.data.find(
                  (ele) => ele._id === data?.data?.data?._id
                )
                  ? mutateAddWishList(data?.data?.data?._id)
                  : mutateRemoveWishList(data?.data?.data?._id);
              }}
            ></i>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
