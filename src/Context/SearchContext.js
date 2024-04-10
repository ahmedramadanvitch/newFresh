import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const SearchContext = createContext();

export default function SearchContextProvider({ children }) {
  let { data } = useQuery();
  // search
  let [searched, setSearched] = useState([]);
  function searchFunc(e) {
    let term = e.target.value;
    setSearched(
      data?.data?.data?.filter((ele) =>
        ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
      )
    );
  }
  return (
    <SearchContext.Provider value={{ searched, setSearched, searchFunc }}>
      {children}
    </SearchContext.Provider>
  );
}
