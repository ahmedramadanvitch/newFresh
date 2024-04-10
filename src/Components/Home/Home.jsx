import React, { useRef, useState } from "react";
import {
  allProducts,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ProductBox from "../ProductBox/ProductBox";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";

export default function Home() {
  let pageNumber = useRef(1);
  function changeRef(x) {
    pageNumber.current = x;
  }

  let { data, isLoading, isError, error, refetch } = useCustomQuery(
    "HomeFeatureProducts",
    () => allProducts(pageNumber.current)
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
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <MainSlider />
      <CategorySlider />
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
      <div className="d-flex justify-content-center align-items-center gap-3 my-3">
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
