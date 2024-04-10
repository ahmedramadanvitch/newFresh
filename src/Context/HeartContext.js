import { createContext, useState } from "react";

export const HeartContext = createContext();

export default function HeartContextProvider({ children }) {
  let [heart, setHeart] = useState(false);

  return (
    <HeartContext.Provider value={{ heart, setHeart }}>
      {children}
    </HeartContext.Provider>
  );
}
