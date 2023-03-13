import convertToSlug from "@/helper/slug";
import { Product } from "@/types/Category";
import { ProductGroup } from "@/types/ProductGroup";
import Link from "next/link";
import React from "react";
import CategoryList from "./CategoryList";
import ProductCard from "./ProductCard";

function ProductBox({
  productGroup,
  handleAddCart,
}: {
  productGroup: ProductGroup;
  handleAddCart? : (id: number, quantity: number) => void;
}) {
  return (
    <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <h2 className="header1 text-lg">{productGroup.title} </h2>
          <span className="mt-1 text-ellipsis whitespace-nowrap  overflow-hidden text-subtitle-text ">
            {productGroup.description}
          </span>
        </div>

        <Link href={`/product-group/${convertToSlug(productGroup.title)}`}>
          <span className="ml-2 text-primary-green">Semua</span>
        </Link>
      </div>
      <div className="mt-6">
        <ProductCard
          products={productGroup.products}
          handleAddCart={handleAddCart}
        />
      </div>
    </div>
  );
}

export default ProductBox;
