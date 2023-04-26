import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './ProductSection.scss';

import React from 'react';

import {
  GrNext,
  GrPrevious,
} from 'react-icons/gr';
import {
  Container,
  Row,
} from 'reactstrap';
import {
  Navigation,
  Pagination,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import CardProduct from '../../share/card_product/CardProduct';
import Title from '../../share/Title/Title';

const ProductSection = ({ sectionName,data }) => {
 
  return (
    <div className="container">
      <div className="title mb-2">
        <h2>{sectionName}</h2>
      </div>
      <div className="row">
      {data.map((product,index)=><CardProduct  key={index} {...product} />)}
      </div>
    </div>
    
  );
};

export default ProductSection;
