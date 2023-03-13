import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import QuantityModal from "@/components/QuantityModal";
import Sidebar from "@/components/Sidebar";
import SkeletonLoading from "@/components/SketelonLoading";
import convertToSlug from "@/helper/slug";
import formatRupiah from "@/hooks/RupiahFormater";
import useCart from "@/hooks/useCart";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const apiUrl = (slug: string) => {
  return `${process.env.NEXT_PUBLIC_API_BACKEND}/product/${slug}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProductDetail() {
    const [showFullDescription, setShowFullDescription] = useState(false);
  const router = useRouter();
  const [recommendProduct, setRecommendProduct] = useState<any[]>([ ]); 
      const { slug } = router.query;
    const { data, error } = useSWR(apiUrl(slug), fetcher);

     const toggleDescription = () => {
       setShowFullDescription(!showFullDescription);
  };
  const { cart, handleAddCart } = useCart();


    
  
  // store to localstorae as history view product
 useEffect(() => {
   if (data) {
     const history = localStorage.getItem("historyView");
     const historyObject = history ? JSON.parse(history) : [];
     if (!history) {
        localStorage.setItem("historyView", JSON.stringify([]));
     }
       const historyData = {
         id: data.data.id,
         name: data.data.name,
         image: data.data.image,
         now_price: data.data.now_price,
       };

     const existingIndex = historyObject.findIndex(
       (item) => item.id === historyData.id
     );
     if (existingIndex > -1) {
       historyObject.splice(existingIndex, 1);
     }
     historyObject.unshift(historyData);

     localStorage.setItem("historyView", JSON.stringify(historyObject));
   }


 }, [data]);
  
  useEffect(() => {


    // check auth
    const token = Cookies.get("token");
    if (token) {
      // get recommend product
      const getRecommendProduct = async () => {
        try {
          const response = await axios.get<any>(
            `${process.env.NEXT_PUBLIC_API_BACKEND}/myrecommendation`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRecommendProduct(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getRecommendProduct();
    }

  
  }, [data]);

  // end store to localstorage as history view product
 



     const description =
       "Buah melon kaya nutrisi, seperti kalium, asam folat, protein, vitamin C, betakaroten, dan magnesium yang baik untuk kesehatan secara menyeluruh hingga kecantikan. Buah melon juga dikenal memiliki kandungan air yang tinggi, sehingga dapat membantu menjaga hidrasi tubuh. Selain itu, buah melon juga memiliki kandungan antioksidan yang dapat membantu melindungi tubuh dari kerusakan sel dan radikal bebas.";
    if (!data) {
        return <SkeletonLoading/>
    }
    return (
      <div className="py-16 relative">
        <Navbar backUrl="/" type={"type2"} title={`${data.data.name}`} />
        <Sidebar cart={cart} />
        <div className="bg-gray-200       rounded-lg   w-full py-8  flex items-center justify-center">
          <Image
            src={`
              ${process.env.NEXT_PUBLIC_IMAGE_BACKEND}/images/${data.data.image_web_big}
            `}
            width={400}
            height={400}
            className="object-cover  h-full "
            alt={"Image " + "Product Name"}
          />
        </div>
        <div className="bg-white  px-4 sm:px-4 lg:px-4 lg:py-4     ">
          {/* image here with next/image  */}
          <div className="flex  flex-col ">
            <div className="flex flex-col">
              <h1 className="font-medium  text-xl">{data.data.name}</h1>
            </div>
            <div className="flex flex-col  gap-2">
              {data.data.discount_id != null && (
                <div className="flex flex-row  mt-2 items-center">
                  <div className="px-4  bg-[#ffdbe2] rounded-md   ">
                    <span className="text-[#f94d63] text-xs">
                      {data.data.discount_percentage}%
                    </span>
                  </div>

                  <span className="text-[#6d7588] ml-2 text-xs line-through ">
                    {formatRupiah(data.data.price)}
                  </span>
                </div>
              )}

              <span className="text-primary-green font-semibold mt-1 line  text-xl">
                {formatRupiah(data.data.now_price)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white  px-4 sm:px-4 lg:px-4 lg:py-4      mt-2">
          {/* category relation with product */}
          <div className="flex flex-row justify-between items-center  w-full ">
            <div className="flex-row flex items-center">
              <div className="bg-[#E0FEE9] py-2 px-2 items-center flex justify-center h-12 w-12 rounded-md">
                <Image
                  src="https://freshmart.oss-ap-southeast-5.aliyuncs.com/images/icon/20230223064558-icon.png"
                  width={24}
                  height={24}
                  className="object-cover "
                  alt="icon"
                />
              </div>
              <div className="flex flex-col ml-5 ">
                <span className="text-xs text-[#5c5c5c] ">
                  Explore our grocery categories
                </span>
                <Link href={`/categories?category_id=${data.data.category.id}`}>
                  <span className="text-sm font-medium text-primary-green">
                    Kategori dengan {data.data.category.name}
                  </span>
                </Link>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-narrow-right text-primary-green"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l14 0"></path>
              <path d="M15 16l4 -4"></path>
              <path d="M15 8l4 4"></path>
            </svg>
          </div>
        </div>
        {/* description here */}

        <div className="bg-white  px-4 sm:px-4 lg:px-4 lg:py-4      mt-2">
          <div className="flex flex-col">
            {showFullDescription ? (
              <span
                className="text-sm font-medium text-[#5c5c5c] mt-2"
                style={{ maxHeight: "150px", overflow: "hidden" }}
              >
                {description}
              </span>
            ) : (
              <span
                className="text-sm font-medium text-[#5c5c5c] mt-2"
                style={{ maxHeight: "150px", overflow: "hidden" }}
              >
                {/* // limit description */}
                {description.substring(0, 100)}
              </span>
            )}

            <button
              className="text-xs font-medium text-primary-green mt-2 underline"
              onClick={() => {
                toggleDescription();
              }}
            >
              {showFullDescription ? "Tutup" : "Baca selengkapnya"}
            </button>
          </div>
        </div>
        {/* end description here */}
        {/* recommend  */}
        {
          recommendProduct && recommendProduct.length > 0 && 
<div className="bg-white  px-4 sm:px-4 lg:px-4 lg:py-4      mt-2">
          <div className="flex flex-col">
            <h1 className="font-medium text-xl">
              We recommend these products!
            </h1>
            <div className="flex flex-row mt-4 gap-5 w-full overflow-x-auto overflow-y-hidden flex-nowrap">
              {recommendProduct.map((item, index) => {
                return (
                  <div
                    className="flex flex-col h-72 min-w-[8rem] justify-between"
                    key={index}
                  >
                    <Link href={`/product/${convertToSlug(item.name)}`}>
                      <div>
                        <div className="bg-gray-100   rounded-lg w-full h-28 py-8  flex items-center justify-center">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                              "/images/" +
                              item.image_web
                            }
                            width={80}
                            height={80}
                            className="object-cover h-full "
                            alt={"Image " + item.name}
                          />
                        </div>

                        <div className="flex flex-col mt-2">
                          <span className="   font-medium w-full ">
                            {item.name.length > 20
                              ? item.name.slice(0, 20) + "..."
                              : item.name}
                          </span>
                          <span className="text-primary-green font-semibold mt-1 line ">
                            {formatRupiah(item.now_price)}
                          </span>
                          {item.discount_id !== null && (
                            <div className="flex flex-row  mt-2 items-center">
                              <div className="px-3 bg-[#ffdbe2] rounded-md   ">
                                <span className="text-[#f94d63] text-xs">
                                  {item.discount_percentage}%
                                </span>
                              </div>
                              <span className="text-[#6d7588] ml-2 text-sm line-through ">
                                {formatRupiah(item.price)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                    <QuantityModal product={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        }
        
        {/* end recommend  */}

        {/* // floating button cart and share  */}
        <div className="max-w-xl mx-auto fixed bottom-0 left-0 right-0  flex flex-row  gap-5 items-center  bg-white  px-4 sm:px-4 lg:px-4 lg:py-4      mt-2">
          <div>
            <button className="bg-white text-primary-green border-2 border-primary-green py-2 px-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-share"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M8.7 10.7l6.6 -3.4"></path>
                <path d="M8.7 13.3l6.6 3.4"></path>
              </svg>
            </button>
          </div>

          <div className="w-full">
            <QuantityModal
              variant={2}
              product={data.data}
              handleAddCart={handleAddCart}
            />
          </div>
        </div>
      </div>
    );
}

export default ProductDetail;
