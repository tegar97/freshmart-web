import Image from "next/image";
import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Product } from "@/types/ProductGroup";
import axios from "axios";
import { cartContext } from "@/context/CartContext";
import formatRupiah from "@/hooks/RupiahFormater";
import useCart from "@/hooks/useCart";
import QuantityModal from "./QuantityModal";
import Link from "next/link";
import convertToSlug from "@/helper/slug";

interface productCart {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
function ProductCard({
  products,
  handleAddCart,
}: {
  products: Product[];
  handleAddCart? : (id: number, quantity: number) => void;
}) {
  return (
    <div className="mx-auto max-w-screen-lg overflow-x-auto">
      <Swiper
        className="overflow-x-scroll px-0"
        slidesPerView={4}
        spaceBetween={31}
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
        {products.map((product: Product) => (
          <SwiperSlide key={product.id}>
            <div className="flex flex-col  h-72	 justify-between  ">
              <Link href={`/product/${convertToSlug(product.name)}`}>
                <div>
                  <div className="bg-gray-100  rounded-lg w-full h-28 py-8  flex items-center justify-center">
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                        "/images/" +
                        product.image_web
                       }
                      width={80}
                      height={80}
                      className="object-cover h-full "
                      alt={"Image " + product.name}
                    />
                  </div>

                  <div className="flex flex-col mt-2">
                    <span className="   font-medium w-full ">
                      {product.name.length > 20
                        ? product.name.slice(0, 20) + "..."
                        : product.name}
                    </span>
                    <span className="text-primary-green font-semibold mt-1 line ">
                      {formatRupiah(product.now_price)}
                    </span>
                    {product.discount_id !== null && (
                      <div className="flex flex-row  mt-2 items-center">
                        <div className="px-3 bg-[#ffdbe2] rounded-md   ">
                          <span className="text-[#f94d63] text-xs">
                            {product.discount_percentage}%
                          </span>
                        </div>
                        <span className="text-[#6d7588] ml-2 text-sm line-through ">
                          {formatRupiah(product.price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
              <QuantityModal product={product} handleAddCart={handleAddCart} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductCard;
