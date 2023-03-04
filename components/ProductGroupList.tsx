import { ProductGroup } from "@/types/ProductGroup";
import { useRouter } from "next/router";
import useSWR from "swr";

import ProductBox from "./ProductBox";
interface Props {
  city: string;
}

const apiUrl = (cityName: string,) => {
  return `${process.env.NEXT_PUBLIC_API_BACKEND}/productsGroup?city_name=${cityName}`;
};


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductGroupList = ({ city }: Props) => {
  console.log("kota" + city);

  const { data, error } = useSWR(apiUrl(city), fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return (
      <div>
        {" "}
        <div className="animate-pulse h-8 w-64 bg-gray-200 rounded-md mt-4"></div>
      </div>
    );
  }

  return (
    <div>
      {data.status != 404
        ? data.data.map((productGroup: ProductGroup) => (
            <ProductBox key={productGroup.id} productGroup={productGroup} />
          ))
        : "Tidak ada product yang tersedia diwilaya nada"}
    </div>
  );
};

export default ProductGroupList;
