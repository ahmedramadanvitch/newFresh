import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// react-slick-slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import HeartContextProvider from "./Context/HeartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // update on cacheTime to be 10 minutes معناها بعد 10 دقايق يعمل كاش تانى من الاول
      cacheTime: 10 * (60 * 1000),
      // if you go to another window don't do fetching again
      refetchOnWindowFocus: false,
      staleTime: 200,
    },
  },
});
root.render(
  <UserContextProvider>
    <HeartContextProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
      </QueryClientProvider>
    </HeartContextProvider>
  </UserContextProvider>
);
