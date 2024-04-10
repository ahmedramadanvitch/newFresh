import React from "react";
import { Helmet } from "react-helmet";
// import { order, useCustomQuery } from "../../QueryFunctions/useQueryFunctions";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import { jwtDecode } from "jwt-decode";

export default function Order() {
  // let { data, isLoading, isError, error } = useCustomQuery("order", order);

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  
  // if (isError) {
  //   return (
  //     <div className="text-center my-3">
  //       <h4>{error.message}</h4>
  //     </div>
  //   );
  // }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Order</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h1 className="text-center my-2 text-main fw-bold">My Order</h1>
      {/* {data?.data} */}
      {/* {data?.data?.map((item) => {
        return (
          <div key={item._id}>
            <div className="fs-4 text-center my-3 d-flex justify-content-between">
              <p>
                {" "}
                <span className="text-main fw-bold">Name :</span>{" "}
                {item.user.name}
              </p>
              <p>
                {" "}
                <span className="text-main fw-bold">Phone : </span>
                {item.shippingAddress.phone}
              </p>
              <p>
                <span className="text-main fw-bold"> City :</span>{" "}
                {item.shippingAddress.city}
              </p>
              <p>
                <span className="text-main fw-bold"> Email :</span>{" "}
                {item.user.email}
              </p>
            </div>
            <div className="my-3 row justify-content-center align-items-center">
              <div className="row justify-content-between align-items-center">
                {item.cartItems.map((cartItem) => {
                  return (
                    <div key={cartItem._id} className="col-md-2 product">
                      <img
                        src={cartItem.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                      <h3 className="text-main">
                        {cartItem.product.title.split(" ").slice(0, 2).join("")}
                      </h3>
                      <p className="lead">
                        {cartItem.product.category.name
                          .split(" ")
                          .slice(0, 2)
                          .join("")}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>{cartItem.price} EGP</p>
                        <p className="d-flex justify-content-center align-items-center">
                          {cartItem.product.ratingsAverage}
                          <i className="fa-solid fa-star rating-color mx-1"></i>{" "}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })} */}
    </>
  );
}
