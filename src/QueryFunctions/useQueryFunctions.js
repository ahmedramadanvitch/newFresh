import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";

// use Query >> Custom Hook
export function useCustomQuery(key, fn) {
  return useQuery(key, fn);
}

// all products
export function allProducts(number) {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?page=${number}`
  );
}

// Single Product Details
export function singleProductDetails(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}

//(cart) get Num of items of Cart >> useQuery because it axios.get
export function NumOfItems() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

//(WishList) Wish List Array
export function WishListArray() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

// Category Slider && Categories components
export function categorySlider() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
}

// Sub-Category
export function subCategory(id) {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  );
}

// Order
// const idToken = jwtDecode(localStorage.getItem("userToken"));
// console.log("idToken", idToken);
// export function order() {
//   return axios.get(
//     `https://ecommerce.routemisr.com/api/v1/orders/user/${idToken?.id}`
//   );
// }

// Brands
export function brands() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
}

// specific brands
export function specificBrands(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
}

//   use Query
//   , {
//   for use (data) as (data?.data?.data)
//   select: (data) => data?.data?.data,
//   update on cacheTime to be 10 minutes معناها بعد 10 دقايق يعمل كاش تانى من الاول
//   cacheTime: 3000,
//   // if you go to another window don't do fetching again
//   refetchOnWindowFocus: false,
//   staleTime: 20000,
// }
