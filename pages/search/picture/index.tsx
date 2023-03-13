import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/ProductGroup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

function SearchPicture() {
  const router = useRouter();
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk
  const imgRef = useRef(null);
  const { response,file ,score} = router.query; // Mendapatkan query parameter dari URL
  const { handleAddCart } = useCart();

  useEffect(() => {
    // CONVER RESPONSE TO JSON
    const data = JSON.parse(response);
    setProducts(data);
  }, [response]);

  console.log(products);
  return (
    <div className="py-16  ">
      <Navbar type={"type1"} />
      <div className="bg-white mt-2 px-4 sm:px-4 lg:px-4    lg:py-4 flex flex-row gap-5 ">
        <Image
          width={90}
          height={90}
          src={file}
          className="object-cover rounded-md"
          alt={"user product input"}
        />

        <div>
          <span className="text-lg font-semibold m">
            Found {products.length} similiar products
          </span>
          <div className="mt-2">
            <span>level of similarity to our products{}' </span>
            {score && parseInt(score) > 60 ? (
              <span className="text-primary-green font-semibold">{score}%</span>
            ) : (
              <span className="text-red-500 font-semibold">{score}%</span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 px-4 sm:px-4  h-screen lg:px-4 lg:py-4  gap-5 ">
        <h1 className="header1 mb-5"> Product found! See results below</h1>
        <div className="grid grid-cols-4 gap-10 ">
          {products.length > 0 &&
            products.map((products: Product[], index: any) => (
              <ProductGrid
                handleAddCart={handleAddCart}
                key={index}
                product={products}
              />
            ))}
        </div>
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <p>
              Unfortunately, we dont have that product in our database at this
              time. We`ll keep working to expand our collection
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPicture;
