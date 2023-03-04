import Image from "next/image";
import React, { useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Autoplay]);

const images = [
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
 
];

function BannerPromo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="relative">
      <div className="w-full h-full">
        <Swiper
          autoplay={{ delay: 3000 }}
          onSlideChange={handleSlideChange}
          loop
        >
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Image
                className="rounded-lg"
                height={429}
                width={600}
                src={imageUrl}
                alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={` mx-2 cursor-pointer ${
              index === activeIndex
                ? "bg-primary-green w-5  h-2 rounded-full "
                : "bg-white h-2 w-2 rounded-full "
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerPromo;
