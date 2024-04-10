import React from "react";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToWishList,
  removeFromWishList,
  useCustomMutation,
} from "../../QueryFunctions/useMutationFunctions";
import {
  WishListArray,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function ProductBox({ productProps }) {
  // add to cart
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

  if (
    addToCartLoading ||
    wishListLoading ||
    addToWishListLoading ||
    removeFromWishListLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="col-md-3">
        <div className="product p-2 ">
          <Link to={`/singleProductDetails/${productProps._id}`}>
            <img
              src={productProps.imageCover}
              className="w-100 mb-2"
              alt={productProps.title}
            />
          </Link>

          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h5 text-main">{productProps.category.name}</h2>
            <i
              className="fa-solid fa-heart mx-2 fs-5 cursor-pointer"
              style={
                wishListData?.data?.data.some(
                  (ele) => ele._id === productProps._id
                )
                  ? { color: "red" }
                  : { color: "unset" }
              }
              onClick={() => {
                !wishListData?.data?.data.find(
                  (ele) => ele._id === productProps._id
                )
                  ? mutateAddWishList(productProps._id)
                  : mutateRemoveWishList(productProps._id);
              }}
            ></i>
          </div>
          <p className="text-black">{productProps.title}</p>
          <div className="d-flex justify-content-between align-items-center text-black">
            <span>{productProps.price} EGP</span>
            <span>
              {productProps.ratingsAverage}{" "}
              <i className="fa-solid fa-star rating-color mx-1"></i>{" "}
            </span>
          </div>

          <button
            onClick={() => {
              mutate(productProps._id);
            }}
            className="btn fs-5 bg-main text-white my-3 mx-auto d-block w-75"
          >
            + Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
