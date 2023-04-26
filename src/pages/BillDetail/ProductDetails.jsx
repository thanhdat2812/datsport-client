import React,{useEffect} from "react";
import { formatCurrency } from "../../utils/common.js";

const ProductDetails = ({item}) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
              <img
                src={item.product.productImage1}
                alt=""
                className="img-fluid d-block"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="fs-15">
                <a
                  href="apps-ecommerce-product-details"
                  className="link-primary"
                >
                  {item.product.productName}
                </a>
              </h5>
            
              <p className="text-muted mb-0">
                Size: <span className="fw-medium">{item.billdetailSize}</span>
              </p>
            </div>
          </div>
        </td>
        <td>{item.billdetailPrice}</td>
        <td>{item.billdetailQuantity}</td>
        <td className="fw-medium text-end">{formatCurrency(item.billdetailPrice*item.billdetailQuantity)}</td>
      </tr>
    </React.Fragment>
  );
};

export default ProductDetails;
