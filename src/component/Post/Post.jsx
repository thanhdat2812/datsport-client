import React from "react";
import Img from "../../assets/images/banner.avif";
const Post = () => {
  return (
    <div className="">
      <img src={Img} alt="alt-detail" />
      <div>
        <h2>MASTER OF PRODUCT 2023</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
          pariatur, expedita a vitae distinctio repellat eum exercitationem
        </p>
      </div>
    </div>
  );
};

export default Post;
