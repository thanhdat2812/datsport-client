import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchOrderById} from '../redux/orderSlice'

import bill from "../api/bill";

export default function useBillDetail(billId) {

  const [loading, setLoading] = useState(false);

  const {selectedOrder,billDetails}=useSelector((state=>state.order));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productResult = await productApi.getProductByProductId(billId);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
      setLoading(false);
    })();
  }, [billId]);

  return { product, brand, category, loading };
}
