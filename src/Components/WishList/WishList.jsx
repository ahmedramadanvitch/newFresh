import React from "react";
import {
  WishListArray,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import {
  addToCart,
  removeFromWishList,
  useCustomMutation,
} from "../../QueryFunctions/useMutationFunctions";

export default function WishList() {
  // wish list Array
  let { data, isLoading, isError, error } = useCustomQuery(
    "WishListArray",
    WishListArray
  );

  // remove from wishList
  let { mutate: mutateRemoveWish, isLoading: removeLoading } =
    useCustomMutation(removeFromWishList);

  // add to cart
  let { mutate: mutateAddToCart, isLoading: addToCartLoading } =
    useCustomMutation(addToCart);

  // Loading Spinner Api
  if (isLoading || removeLoading || addToCartLoading) {
    return <LoadingSpinner />;
  }
  // Error Api
  if (isError) {
    return (
      <div className="text-center my-3">
        <h4>{error.message}</h4>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="bg-light py-2 px-4">
        <h1 className="my-3 text-main fw-bold text-center">WishList</h1>
        <hr className="d-block w-25 mx-auto" />
        {data?.data?.data.length === 0 ? (
          <div
            style={{ height: "35vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <h1>Your Wish List Is Empty</h1>
          </div>
        ) : (
          data?.data?.data?.map((item) => {
            return (
              <div className="row" key={item._id}>
                <div className="col-md-1 my-3">
                  <img
                    src={item.imageCover}
                    className="w-100"
                    alt={item.title}
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between align-items-center">
                  <div>
                    <p>{item.title.slice(0, 35)}</p>
                    <p className="text-main fw-bold">
                      {" "}
                      Price : {item.price} EGP
                    </p>
                    <div
                      onClick={() => mutateRemoveWish(item?._id)}
                      className="cursor-pointer text-danger"
                    >
                      <i className="fa-solid fa-trash-can me-2"></i>
                      Remove
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      mutateAddToCart(item?._id);
                      mutateRemoveWish(item?._id);
                    }}
                    className="btn btn-success"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
