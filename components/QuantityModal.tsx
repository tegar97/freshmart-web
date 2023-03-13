import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Product } from "@/types/ProductGroup";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import formatRupiah from "@/hooks/RupiahFormater";

type QuantityModalProps = {
  product: Product;
  variant?: number;
  handleAddCart?: (product: Product, id: number, quantity: number) => void;
};

export default function QuantityModal({
  product,
  variant = 1,
  handleAddCart ,
}: QuantityModalProps) {
  const { checkIfItemExistsInCart, setCart, cart, setTrigger, trigger } =
    useCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  // handle add to cart with hooks handleAddCart
  const handleAddToCart = () => {
    if (product && product.now_price && selectedQuantity > 0) {
      //fix Cannot invoke an object which is possibly 'undefined'.

     

      handleAddCart({
        ...product,
        quantity: selectedQuantity,
        price: product.now_price,
      });
    }
   
    setModalIsOpen(false);
    alert("Add to cart success");
  };
  function openModal() {
    const item = checkIfItemExistsInCart(product.id);

    if (item) {
      console.log(item);
      setSelectedQuantity(item.quantity);
    }
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  //hande add quantity to hook handleAddCart
  // const handleAddQuantity = () => {
  //     handleAddCart({ ...product, quantity: selectedQuantity });
  //     setModalIsOpen(false);
  // };

  // useEffect  checkIfItemExistsInCart from useCart

  return (
    <div>
      {variant == 1 ? (
        <button
          onClick={openModal}
          className=" bg-primary-green px-2 py-1 mt-4 rounded-sm"
        >
          <span className="text-white  text-sm font-medium ">Add to cart</span>
        </button>
      ) : variant == 2 ? (
        <button
          onClick={openModal}
          className="bg-primary-green text-white py-2 px-4 rounded-md w-full"
        >
          Tambahkan ke keranjang
        </button>
      ) : (
        <button
          onClick={openModal}
          style={{ borderWidth: "1px" }}
          className="bg-white text-primary-green border-green-500  py-2  rounded-md w-full"
        >
          + Keranjang
        </button>
      )}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal max-w-xl mx-auto   h-full overflow-y-auto  bg-white shadow-md absolute border-none  outline-none"
        overlayClassName="overlay"
      >
        {/* <h1 className="mb-4 text-2xl font-bold">Choose Quantity</h1> */}
        <div className="flex flex-col   justify-between h-full">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="bg-gray-100  rounded-lg  w-20 h-20  py-4  flex items-center justify-center ">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                    "/images/" +
                    product.image
                  }
                  width={60}
                  height={60}
                  className="object-cover "
                  alt={"Image " + product.name}
                />
              </div>

              <div className="flex flex-col ml-5">
                <span className="font-medium w-full ">
                  {product.name.length > 20
                    ? product.name.slice(0, 20) + "..."
                    : product.name}
                </span>
              </div>
            </div>
            {/* <span className="text-gray-500 text-sm mt-2">
              {product.description.length > 50
                ? product.description.slice(0, 50) + "..."
                : product.description}
            </span> */}
          </div>

          {/* description with limit text */}

          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-start">
                <span className="font-medium">Price</span>
                {product.discount_id != null ? (
                  <div className="flex flex-row mb-2 mt-1 items-center gap-2">
                    <span className="text-gray-500 line-through text-sm">
                      Rp. {product.price}
                    </span>
                    <div className="px-1  bg-[#ffdbe2] rounded-md   ">
                      <span className="text-[#f94d63] text-xs">
                        Hemat {product.discount_percentage}%
                      </span>
                    </div>
                  </div>
                ) : null}
                <span className="font-medium text-lg  text-primary-green">
                  {formatRupiah(product.now_price * selectedQuantity)}{" "}
                </span>
              </div>
              <div className="flex justify-center items-end">
                <button
                  onClick={() => setSelectedQuantity(selectedQuantity - 1)}
                  className="rounded-full px-3 py-1 border-gray-300 border mr-2"
                >
                  -
                </button>
                <input
                  className="border-gray-300 border rounded w-16 text-center"
                  type="text"
                  value={selectedQuantity}
                />
                <button
                  className="rounded-full px-3 py-1  text-primary-green border ml-2"
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 rounded-md bg-primary-green text-white hover:bg-green-600"
            >
           Add to cart
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

