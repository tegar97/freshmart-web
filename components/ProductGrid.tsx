import Image from "next/image";
import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Product } from "@/types/ProductGroup";
import { cartContext } from "@/context/CartContext";
import formatRupiah from "@/hooks/RupiahFormater";
import QuantityModal from "./QuantityModal";

interface productCart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  now_price: number;
  discount_percentage: number;
  discount_id : number
}
function ProductGrid({ product }: { product: productCart }) {
  const { cart, setCheckTriggerCart, setCart } = useContext(cartContext);

  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = async (product: productCart) => {
    // Mengambil keranjang dari local storage
    
    const cart = JSON.parse(localStorage.getItem("cart"));

    // Mengecek apakah produk sudah ada di keranjang
    const existingProductIndex = cart.findIndex(
      (item: { id: number }) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Jika produk sudah ada di keranjang, tambahkan jumlahnya
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Jika produk belum ada di keranjang, tambahkan produk ke keranjang
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image : product.image,
        quantity,
      };
      cart.push(newProduct);
    }

    // Menyimpan keranjang ke local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Mengosongkan input jumlah barang
    setQuantity(1);

    // Memberikan notifikasi bahwa produk telah ditambahkan ke keranjang
    alert("Product added to cart");
    setCart(cart);
    setCheckTriggerCart(true);

    // Mengirimkan keranjang ke API untuk disimpan pada local storage
    //  await axios.post("/api/cart", cart);
  };
  return (
    <div className="flex flex-col  h-64	 justify-between  ">
      <div>
        <div className="bg-gray-100  rounded-lg w-full h-28 py-8  flex items-center justify-center">
          <Image
            src={
              process.env.NEXT_PUBLIC_IMAGE_BACKEND + "/images/" + product.image
            }
            width={80}
            height={80}
            className="object-cover h-full "
            alt={"Image " + product.name}
          />
        </div>

        <div className="flex flex-col mt-2">
          <span className="   font-medium w-full ">
            {product.name.length > 15
              ? product.name.slice(0, 15) + "..."
              : product.name}
          </span>
          <span className="text-primary-green font-semibold mt-1 line ">
            {formatRupiah(product.now_price)}
          </span>
          {product.discount_id !== null && (
            <div className="flex flex-row  mt-2 items-center">
              <div className="px-4  bg-[#ffdbe2] rounded-md   ">
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
      <QuantityModal product={product} />
    </div>
  );
}

export default ProductGrid;
