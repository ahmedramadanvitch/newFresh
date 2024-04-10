import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import {
  categorySlider,
  subCategory,
  useCustomQuery,
} from "../../QueryFunctions/useQueryFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useQuery } from "react-query";

export default function Categories() {
  // use Ref to get Id and
  const idb = useRef("");
  function changeRef(x) {
    idb.current = x;
  }
  // all category
  let {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useCustomQuery("Categories", categorySlider);

  // subCategory
  let {
    data: subCategoryData,
    refetch,
    isLoading: subCategoryLoading,
  } = useQuery("subCategory", () => subCategory(idb.current), {
    enabled: false,
  });

  // Loading Spinner Api
  if (isLoading || subCategoryLoading) {
    return <LoadingSpinner />;
  }
  // Error Api
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="category">
        <div className="subCategory row gy-2 my-3">
          {subCategoryData?.data?.data.map((item) => {
            return (
              <>
                <div key={item._id} className="col-md-4">
                  <p className="text-center my-auto border border-1 p-3">
                    {item.name}
                  </p>
                </div>
              </>
            );
          })}
        </div>
        <div className="row my-5 gy-4">
          {categoryData?.data?.data.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => {
                  changeRef(item._id);
                  refetch();
                }}
                className="col-md-4 "
              >
                <div className="border border-1  product">
                  <img
                    src={item.image}
                    height={350}
                    className="w-100 cursor-pointer"
                    alt=""
                  />
                  <h3 className="text-center py-2 text-main fw-bold">
                    {item.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
