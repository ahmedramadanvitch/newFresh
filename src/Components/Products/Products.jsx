import React, { useRef, useState } from "react";
import ProductBox from "../ProductBox/ProductBox";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";
import {
  allProducts,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
export default function Products() {
  // number of pagination (1 or 2)
  const PageNumber = useRef(2);
  function changeRef(x) {
    PageNumber.current = x;
  }

  let { data, isLoading, error, isError, refetch } = useCustomQuery(
    "ProductsFeaturedProduct",
    () => allProducts(PageNumber.current)
  );

  // search
  let [searched, setSearched] = useState([]);
  function search(e) {
    let term = e.target.value;
    setSearched(
      data?.data?.data?.filter((ele) =>
        ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
      )
    );
  }

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
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="d-block w-50 mx-auto my-5">
        <input
          type="text"
          className="w-100 form-control"
          placeholder="Search Here"
          onChange={search}
          name=""
          id=""
        />
      </div>

      <div className="d-flex justify-content-center align-items-center gap-3 my-2">
        <button
          value={1}
          onClick={(e) => {
            changeRef(e.target.value);
            refetch();
          }}
          className="btn bg-main text-white"
        >
          1
        </button>
        <button
          value={2}
          onClick={(e) => {
            changeRef(e.target.value);
            refetch();
          }}
          className="btn bg-main text-white"
        >
          2
        </button>
      </div>

      <div className="row gy-4">
        {searched.length
          ? searched.map((item) => {
              return <ProductBox key={item._id} productProps={item} />;
            })
          : data?.data?.data?.map((item) => {
              return <ProductBox key={item._id} productProps={item} />;
            })}
      </div>
    </>
  );
}
