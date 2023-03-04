import { useState, useEffect } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
    //create state trigger for render component
  const [trigger, setTrigger] = useState('');
  const [cartShow, setCartShow] = useState(false);

  useEffect(() => {
    console.log(trigger)
    const getCart = async () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(cart);

      //handle if quantity is 0
      const newCart = cart.filter((item: CartItem) => item.quantity > 0);
      setCart(newCart);
      console.log('cart => ',cart)
      localStorage.setItem("cart", JSON.stringify(newCart));
    };

    getCart();
  }, [trigger]);

  // create function add cart and validation
  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}-${random}`;
  }

  const handleAddCart = (item: CartItem) => {
    // set trigger for render component
    setTrigger(generateUniqueId);


    // user can decision quantity item when click button add to cart
    if (item.quantity === null) {
      return;
    }

    // validation if quantity is 0
    if (Number(item.quantity) === 0) {
      alert("Please enter quantity");
      return;
    }

    // validation if quantity is not number
    if (isNaN(Number(item.quantity))) {
      alert("Please enter number");
      return;
    }

    // validation if quantity is not integer
    if (!Number.isInteger(Number(item.quantity))) {
      alert("Please enter integer");
      return;
    }

    // validation if quantity is negative
    if (Number(item.quantity) < 0) {
      alert("Please enter positive number");
      return;
    }

    // validation if quantity is decimal
    if (Number(item.quantity) % 1 !== 0) {
      alert("Please enter integer");
      return;
    }

    // validation if quantity is more than 10
    if (Number(item.quantity) > 10) {
      alert("Maximum quantity is 10");
      return;
    }

    // validation if item already in cart
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
    if (itemInCart) {
      const index = cart.indexOf(itemInCart);
      const updatedCart = [...cart];
      updatedCart[index] = {
        ...itemInCart,
        quantity: Number(item.quantity),
      };
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }

    const newCart = [...cart];
    newCart.push({
      ...item,
      quantity: Number(item.quantity),
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
 

    return newCart;
  };

  // create get cart 
  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cart);
  };

  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCart = [...cart];
    newCart[index].quantity = Number(e.target.value);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDelete = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // create function add to cart quantity to cart
  const handleAddToCart = (index: number) => {
    const newCart = [...cart];

    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // create function minus to cart quantity to cart

  const handleMinusToCart = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity -= 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    //show popup when quantity is 0
    if (newCart[index].quantity === 0) {
      alert("Are you sure to delete this item?");
    }

    //handle if quantity is 0
    const newCart2 = newCart.filter((item: CartItem) => item.quantity > 0);
    setCart(newCart2);
    localStorage.setItem("cart", JSON.stringify(newCart2));
  };

  // create handle show cart
  const handleShowCart = () => {
    setCartShow(!cartShow);
  };

  function checkIfItemExistsInCart(itemId: number) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.find((item : CartItem) => item.id === itemId);
  }

  //add clear cart

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return {
    cart,
    setCart,
    cartShow,
    handleChange,
    handleDelete,
    handleAddToCart,
    handleMinusToCart,
    handleShowCart,
    handleAddCart,
    checkIfItemExistsInCart,
    trigger,
    setTrigger,
    clearCart,
  };
}

export default useCart;
