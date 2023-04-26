import React from "react";

// import { GrNext, GrPrevious } from "react-icons/gr";
// import { Autoplay, Navigation, Pagination } from "swiper";
// import { SwiperSlide, Swiper as SwiperBanner } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper , SwiperSlide } from "swiper/react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {sliderActions} from "../../redux/sliderActions";

import "./Banner.scss";
const Banner = () => {
  const dispatch = useDispatch();
  
  const { dataAllSlider } = useSelector((state) => state.slider);

  useEffect(() => {
    dispatch(sliderActions.getAll(1));
    
  }, [dispatch]);

  return (
    <div id="banner" className="banner">
      <div className="banner-wrapper">
        <div className="slider-wrapper">
          <div className="wrapper-slide px-0">
            <Swiper
              cssMode={true}
              pagination={true}
              mousewheel={true}
              slidesPerView={1}
              spaceBetween={15}
              keyboard={true}
              autoplay={{
                delay: 2500,
              }}
              loop
              speed={200}
              modules={[Autoplay, Navigation, Pagination]}
              className="bannerSwiper"
              style={{ paddingTop: "0", paddingLeft: 0, paddingRight: 0 }}
            >
              {dataAllSlider.map((slide, idx) => {
                return (
                  <SwiperSlide key={idx}>
                  <div class="slider-img-wrapper">
                  <img src={slide.slider_image} class="slider-img" alt="image_alt" />

                  </div>
                    
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        
      </div>
    </div>
    // <Swiper
    //   pagination={{ clickable: true, dynamicBullets: true }}
    //   modules={[Pagination, Autoplay]}
    //   loop={true}
    //   autoplay={{ delay: 2500, disableOnInteraction: false }}
    //   className="mySwiper swiper pagination-dynamic-swiper rounded"
    // >
    //   <div className="swiper-wrapper">
    //     <SwiperSlide>
    //       <img src={ImgBanner} alt="" className="img-fluid" />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img src={ImgBanner2} alt="" className="img-fluid" />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img src={ImgBanner3} alt="" className="img-fluid" />
    //     </SwiperSlide>
    //   </div>
    // </Swiper>
  );
};

export default Banner;
