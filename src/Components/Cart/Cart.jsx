import React, { useState } from "react";
import styleCart from "./cart.module.css";
import {
  checkOut,
  clearCart,
  removeFromCart,
  updateQuantity,
  useCustomMutation,
} from "../../QueryFunctions/useMutationFunctions";
import {
  getCart,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  // checkOut inputs
  let [details, setDetails] = useState("");
  let [phone, setPhone] = useState("");
  let [city, setCity] = useState("");

  // checkOut function UseMutate
  let { mutate: mutateCheckOut, data: dataCheckOut } =
    useCustomMutation(checkOut);

  // get number of items
  let { data, isLoading, isError } = useCustomQuery("getCart", getCart);
  // check out -- add address
  function addAddress(e) {
    e.preventDefault();
    let shippingAddress = {
      details,
      phone,
      city,
    };
    mutateCheckOut({ id: data?.data?.data?._id, shippingAddress });
    if (dataCheckOut?.data?.status === "success") {
      window.location.href = dataCheckOut?.data?.session?.url;
    }
  }

  // remove from cart
  let { mutate: mutateRemove, isLoading: removeLoading } =
    useCustomMutation(removeFromCart);

  // update quantity
  let { mutate: mutateUpdate, isLoading: updateLoading } =
    useCustomMutation(updateQuantity);

  // clear Cart
  let { mutate: mutateClearCart, isLoading: clearLoading } =
    useCustomMutation(clearCart);

  // Loading Spinner Api
  if (isLoading || removeLoading || updateLoading || clearLoading) {
    return <LoadingSpinner />;
  }
  // Error Api
  if (isError) {
    return (
      <div className="text-center my-5">
        <h4>Cart Is Empty ... </h4>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <aside className={`${styleCart.aside}`}>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-main fw-bold">My Cart</h1>
        </div>
        <hr />
        {data?.data?.numOfCartItems > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4>
                  Total Price :{" "}
                  <span className="fw-bold text-main">
                    {data?.data?.data?.totalCartPrice} EGP
                  </span>
                </h4>
              </div>
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCheck"
                  className="btn btn-primary text-white w-100 my-2 fw-bold"
                >
                  Check Out
                </button>
                <h5>
                  Number Of Cart Items :{" "}
                  <span className="fw-bold text-main">
                    {data?.data?.numOfCartItems}
                  </span>
                </h5>
              </div>
            </div>
            <div>
              {data?.data?.data?.products.map((item) => {
                return (
                  <div
                    className="row gy-2 my-3 border border-1 py-2"
                    key={item.product._id}
                  >
                    <div className="col-md-2 my-3">
                      <img
                        src={item.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                      <div>
                        <p>{item.product.title}</p>
                        <p className="text-main fw-bold">
                          {" "}
                          Price : {item.price} EGP
                        </p>
                        <div
                          onClick={() => mutateRemove(item?.product?._id)}
                          className="cursor-pointer text-danger"
                        >
                          <i className="fa-solid fa-trash-can me-2"></i>
                          Remove
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center gap-4">
                        <button
                          className="btn bg-main fs-4 p-2 rounded-2 text-white cursor-pointer"
                          onClick={() =>
                            item.count === 1
                              ? mutateRemove(item?.product?._id)
                              : mutateUpdate({
                                  productId: item?.product?._id,
                                  count:
                                    item.count > 0
                                      ? item.count - 1
                                      : item.count,
                                })
                          }
                        >
                          -
                        </button>
                        <span className="d-block fs-4">{item.count}</span>
                        <button
                          className="btn bg-main fs-4 p-2 rounded-2 text-white cursor-pointer"
                          onClick={() =>
                            mutateUpdate({
                              productId: item?.product?._id,
                              count: item.count + 1,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                mutateClearCart();
                navigate("/");
              }}
              className="btn btn-danger fs-5 w-100 my-3"
            >
              Clear Cart
            </button>
            {/* Modal BootStrap */}
            <div
              className="modal fade"
              id="exampleModalCheck"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form action="">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Details"
                        onChange={(e) => {
                          setDetails(e.target.value);
                        }}
                        name=""
                        id=""
                      />
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        name=""
                        id=""
                      />
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="City"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        name=""
                        id=""
                      />
                      <button
                        onClick={addAddress}
                        className="btn btn-danger"
                        type="submit"
                      >
                        Add Address
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h5 className="h1 text-center text-main my-5">Your Cart Is Empty</h5>
        )}
      </aside>
    </>
  );
}
