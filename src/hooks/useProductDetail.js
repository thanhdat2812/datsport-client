import { useEffect, useState } from "react";

import productApi from "../api/product";
import brandApi from "../api/brand";
import categoryApi from "../api/category";

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [brand, setBrand] = useState({});
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productResult = await productApi.getProductByProductId(productId);
        setProduct(productResult);
        setBrand(productResult.brand);
        setCategory(productResult.category);
        
       
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { product, brand, category, loading };
}
