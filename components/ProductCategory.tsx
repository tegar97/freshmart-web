import { useRouter } from "next/router";
import useSWR from "swr";
import Cookies from "js-cookie";
import ProductCard from "./ProductCard";
import ProductBox from "./ProductBox";
import { Product, ProductGroup } from "@/types/ProductGroup";
import ProductGrid from "./ProductGrid";

const apiUrl = (cityName: string,category_id : number) => {
  return `http://freshmarket.test/api/v1/products?city_name=${cityName}${category_id ? `&category_id=${category_id}` : ''}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductCategory = ({ city ,category_id} : {city: string , category_id : number}) => {
  console.log("kota" + city);

  const { data, error } = useSWR(apiUrl(city, category_id), fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-10 ">
        {data.status != 404
          ? data.data.map((products: Product[], index: any) => (
              <ProductGrid key={index} product={products} />
            ))
          : "Tidak ada product yang tersedia diwilaya nada"}
      </div>
      {data.data.length == 0
        ? "Ooops products with this category are currently  not available "
        : ""}
    </>
  );
};

export default ProductCategory;
