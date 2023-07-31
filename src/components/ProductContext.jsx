// ProductContext.js
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [productArray, setProductArray] = useState([]);

  return (
    <ProductContext.Provider value={{ productArray, setProductArray }}>
      {children}
    </ProductContext.Provider>
  );
};
