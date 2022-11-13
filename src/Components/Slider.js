import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

export default function Carousel() {
  return (
    <>
      <Swiper style={{height: "40vh"}}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide> <img src="./carroul1.jpg" className="d-block w-100 " alt="..." /></SwiperSlide>
        <SwiperSlide><img src="./caryoul2.jpg" className="d-block w-100" alt="..." /></SwiperSlide>
        <SwiperSlide><img src="carryoul3.jpg" className="d-block w-100" alt="..." /></SwiperSlide>
      </Swiper>
    </>
  );
}