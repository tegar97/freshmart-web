import Link from "next/link";
import React from "react";
import CategoryList from "./CategoryList";

function CategoryBox() {
  return (
    <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4 lg:py-4">
      <div className="flex justify-between ">
        <h2 className="header1 text-lg">Kategori  </h2>
        <Link href="/address">
          <span className="ml-2 text-primary-green">Semua</span>
        </Link>
      </div>
      <div className="mt-6">
        <CategoryList />
      </div>
    </div>
  );
}

export default CategoryBox;
