import Navbar from "@/components/Navbar";
import QuantityModal from "@/components/QuantityModal";
import Sidebar from "@/components/Sidebar";
import formatRupiah from "@/hooks/RupiahFormater";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

const apiUrl = (slug: string) => {
  return `${process.env.NEXT_PUBLIC_API_BACKEND}/product/${slug}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProductDetail() {
    const [showFullDescription, setShowFullDescription] = useState(false);
      const router = useRouter();
      const { slug } = router.query;
    const { data, error } = useSWR(apiUrl(slug), fetcher);

     const toggleDescription = () => {
       setShowFullDescription(!showFullDescription);
    };
    

     const description =
       "Buah melon kaya nutrisi, seperti kalium, asam folat, protein, vitamin C, betakaroten, dan magnesium yang baik untuk kesehatan secara menyeluruh hingga kecantikan. Buah melon juga dikenal memiliki kandungan air yang tinggi, sehingga dapat membantu menjaga hidrasi tubuh. Selain itu, buah melon juga memiliki kandungan antioksidan yang dapat membantu melindungi tubuh dari kerusakan sel dan radikal bebas.";
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
      <div className="py-16 relative">
        <Navbar type={"type2"} title={`${data.data.name}`} />
        <Sidebar />
        <div className="bg-gray-200   rounded-lg  w-full py-8  flex items-center justify-center">
          <Image
            src={`https://freshmart.oss-ap-southeast-5.aliyuncs.com/images/images/20230221110135-images.png`}
            width={400}
            height={400}
            className="object-cover "
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
                  Eksplor lebih banyak{" "}
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
                    <QuantityModal variant={2} product={data.data} />
          </div>
        </div>
      </div>
    );
}

export default ProductDetail;
