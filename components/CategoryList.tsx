import { Category } from "@/types/Category";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";



const apiUrl = process.env.NEXT_PUBLIC_API_BACKEND + "/category";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CategoryList = ({ simpelMode = false, setCategoryId ,categoryId}) => {
  const { data, error } = useSWR(apiUrl, fetcher);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
 if (!data) {
   return (
     <div className="mx-auto max-w-screen-lg overflow-x-auto">
       <Swiper
         className="overflow-x-scroll px-0"
         slidesPerView={simpelMode ? 6 : 4}
         spaceBetween={simpelMode ? 15 : 31}
         breakpoints={{
           640: {
             slidesPerView: 2,
           },
           768: {
             slidesPerView: 3,
           },
           1024: {
             slidesPerView: 4,
           },
         }}
       >
         {[1, 2, 3, 4, 5, 6].map((_, index) => (
           <SwiperSlide key={index}>
             <div className="flex flex-col items-start  ">
               <div
                 className={
                   " h-28 flex justify-center items-center rounded-2xl w-full bg-gray-200"
                 }
               >
                 <div
                   className="w-12 h-12 bg-gray-300 rounded-full"
                   style={{ margin: "0 auto" }}
                 />
               </div>
               <div className="text-center w-full mt-2  ">
                 <span className="text-md bg-gray-200 h-4 w-24" />
               </div>
             </div>
           </SwiperSlide>
         ))}
       </Swiper>
     </div>
   );
 }
  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
  };
  return (
    <div className="mx-auto max-w-screen-lg overflow-x-auto">
      <Swiper
        className="overflow-x-scroll px-0"
        slidesPerView={simpelMode ? 6 : 4}
        spaceBetween={simpelMode ? 15 : 31}
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {data.data.map((category: Category) => (
          <SwiperSlide key={category.id}>
            {!simpelMode ? (
            <Link href={`/categories?category_id=${category.id}`}>
                <div className="flex flex-col items-start  ">
                  <div
                    className={
                      " h-28 flex justify-center items-center rounded-2xl w-full"
                    }
                    style={{ backgroundColor: category.bgColor }}
                  >
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                        "/icon/" +
                        category.icon
                      }
                      alt={category.name}
                      className="object-cover"
                      width={47}
                      height={47}
                    />
                  </div>
                  <div className=" text-center w-full mt-2  ">
                    <span className="text-md ">{category.name}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                onClick={() => setCategoryId(category.id)}
                style={{
                  backgroundColor:
                    categoryId == category.id ? "rgba(49, 186, 87, 0.07)" : "",
                }}
                className=" w-full text-left border-category text-ellipsis overflow-hidden whitespace-nowrap border-gray-500 px-2 py-2  cursor-pointer  "
              >
                <span className="text-md ">{category.name}</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
