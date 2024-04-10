import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

// use mutation
export function useCustomMutation(fn) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      // Invalidate and refetch -- to do update on UI
      queryClient.invalidateQueries("NumOfItems");
      queryClient.invalidateQueries("WishListArray");
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });
}

// add To Cart >> useMutation because it axios.Post
export function addToCart(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    // body
    { productId: productId },
    // header
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

// remove from cart
export function removeFromCart(proId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

// update quantity product
export function updateQuantity({ productId, count }) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

// check out
// id > id of your cart in server (data?.data?.data?._id) this is ID of my cart
export function checkOut({ id, shippingAddress }) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    { shippingAddress },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

// clear Cart
export function clearCart() {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}

// add To wishList >> useMutation because it axios.Post
export function addToWishList(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    // body
    { productId: productId },
    // header
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

// remove from wish List
export function removeFromWishList(proId) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${proId}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}
