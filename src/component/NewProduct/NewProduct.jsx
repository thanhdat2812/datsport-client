import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import React from 'react';

import {
  GrNext,
  GrPrevious,
} from 'react-icons/gr';
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

const NewProduct = () => {
  const data = [
    {
      productId:1,
      productImage:"https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice:150000,
      productName:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại"
    
    },
    {
      productId:1,
      productImage:"https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice:150000,
      productName:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại"
    
    },
    {
      productId:1,
      productImage:"https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice:150000,
      productName:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại"
    
    },
    {
      productId:1,
      productImage:"https://down-vn.img.susercontent.com/file/sg-11134201-22090-m8j2dwol22hvc0",
      productPrice:150000,
      productName:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại",
      productDescription:"Áo khoác cadigan nam nữ chất cotton tổ ong cao cấp, dễ mặc dễ phối đồ, hợp mọi thời đại"
    
    },
   
  ];
  return (
    <div className="w-full px-3">
      <Title isIon title="new product" />
      <div className="w-full h-auto flex items-center justify-start">
        <div className="wrapper-slide">
          <Swiper
            cssMode={true}
            pagination={true}
            mousewheel={true}
            slidesPerView={5}
            spaceBetween={15}
            keyboard={true}
            loop
            speed={200}
            modules={[Navigation, Pagination]}
            className="mySwiper"
            navigation={{
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
          >
            {data.map((product, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <CardProduct {...product} />
                </SwiperSlide>
              );
            })}
            <div className="group-btn-slide">
              <div className="button-prev-slide">
                <GrPrevious size={22} className="icon" />
              </div>
              <div className="button-next-slide">
                <GrNext size={22} className="icon" />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
