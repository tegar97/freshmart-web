import useCart from '@/hooks/useCart';
import Image from 'next/image';
import React, { useEffect } from 'react'

function CartProduct({
  cart,
  index,
  handleAddToCart,
  handleMinusToCart,
  handleDelete,
  handleChange,
    handleUnselectItem,
    handleSelectItem,
}: {
  cart: any;
  index: number;
  handleAddToCart: (index: number) => void;
  handleMinusToCart: (index: number) => void;
  handleDelete: (index: number) => void;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
        handleUnselectItem: (index: number) => void;
        handleSelectItem: (index: number) => void;
}) {
  const [selected, setSelected] = React.useState(false);

  useEffect(() => {
    setSelected(cart.selected);
  }, [cart.selected]);
  return (
    <div
      className="flex flex-row 
        justify-between items-center mt-4 "
    >
      <div className="flex flex-row gap-4 items-center">
        <input
          checked={selected}
          id="default-checkbox"
          type="checkbox"
          onChange={() => {
              setSelected(!selected);
              {
                  selected
                      ? handleUnselectItem(index)
                        : handleSelectItem(index);  
              }
          }}
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-primary-green dark:border-gray-600"
        />

        <div>
          <div
            style={{
              borderRadius: "8px",
              width: "72px",
              height: "72px",
            }}
            className="bg-gray-100  rounded-lg flex items-center justify-center"
          >
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_BACKEND + "/images/" + cart.image
              }
              width={60}
              height={60}
              className="object-cover  "
              alt={"Image " + cart.name}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-left mb-1 text-[#696969]">
            {cart.name}
          </span>
          {
            <span className="text-sm text-left mb-1 text-[#696969]">
              {cart.quantity} x Rp. {cart.price}
            </span>
          }

          <span className="font-medium">Rp. {cart.price * cart.quantity} </span>
        </div>
      </div>

      {/* // add and sub quantity */}

      <div className="flex flex-row gap-4 items-center">
        <button
          className="text-primary-green px-4 py-2 rounded-lg"
          onClick={() => handleDelete(index)}
        >
          Hapus
        </button>
        <div className="flex flex-row gap-4 items-center">
          <button
            onClick={() => handleMinusToCart(index)}
            className="text-primary-green px-4 py-2 rounded-lg"
          >
            -
          </button>
          <input
            type="text"
            value={cart.quantity}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-8 text-center border-2 border-primary-green rounded-lg"
          />
          <button
            onClick={() => handleAddToCart(index)}
            className="text-primary-green px-4 py-2 rounded-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct