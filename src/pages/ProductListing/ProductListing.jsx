import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productApi from "../../api/product";
import LoadingSpinner from "../../share/loading_spinner/LoadingSpinner";
import { formatCurrency } from "../../utils/common";
import ProductSection from '../../component/ProductSection/ProductSection';

const ProductListing = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { success } = useSelector((state) => state.auth);
  
  const getDataCategoryById = async () => {
    try {
      const rs = await productApi.getProductByCategoryId(id);

      setDataCategory(rs);
     
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getDataCategoryById();
  }, [id]);
  return (
    <div className="container">
      <div className="row">
      <ProductSection data={[...dataCategory]} sectionName={dataCategory[0]?.category?.categoryName} />
      </div>
    </div>
    
  );
};

export default ProductListing;
