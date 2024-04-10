import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import {
  brands,
  specificBrands,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Brands() {
  const idBrand = useRef("");
  function changeRef(x) {
    idBrand.current = x;
  }

  // brands
  let { data: brandsData } = useCustomQuery("brands", brands);

  // specific-brands
  let {
    data: specificData,
    refetch,
    isLoading,
    isError,
    error,
  } = useCustomQuery("specificBrands", () => specificBrands(idBrand.current), {
    enabled: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="row mb-5 mt-2 gy-4">
        <h1 className="text-main text-center fw-bold">All Brands</h1>

        {brandsData?.data?.data?.map((item) => {
          return (
            <div
              key={item._id}
              onClick={() => {
                changeRef(item._id);
                refetch();
              }}
              className="col-md-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalBrands"
            >
              <div className="border border-1 product">
                <img src={item.image} className="w-100" alt="" />
                <p className="text-center">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="exampleModalBrands"
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
            <div className="modal-body d-flex justify-content-between align-items-center flex-column-reverse">
              <h1 className="text-main fw-bold">
                {specificData?.data?.data.name}
              </h1>
              <img
                className="w-100"
                src={specificData?.data?.data.image}
                alt={specificData?.data?.data.name}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
}
