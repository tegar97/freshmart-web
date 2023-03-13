import Navbar from "@/components/Navbar";
import QuantityModal from "@/components/QuantityModal";
import Sidebar from "@/components/Sidebar";
import convertToSlug from "@/helper/slug";
import formatRupiah from "@/hooks/RupiahFormater";
import useCart from "@/hooks/useCart";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";

type Message = {
  html: string;
  isUser: boolean;
  youtube?: string;
  requesttype?: string;
  relevanProduct?: any;
  recipeName?: string;
  recipeIngredients?: string;
  recipeDirections?: string;

};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [youtube, setYoutube] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { cart, trigger, handleAddCart } = useCart();
  const [isSave, setIsSave] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = { html: inputText, isUser: true };
    setMessages([...messages, newMessage]);
    setInputText("");
    setLoading(true);
    try {
      // Call API to get bot response
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/chef-ai`,
        {
          text: inputText,
        }
      );

      const botResponse = response.data.data;
      console.log(botResponse);
      console.log(botResponse.text);
      if (botResponse.video != null) {
        setYoutube(botResponse.video);
      }
      const botMessage: Message = {
        html: botResponse.text.replace("\n", "<br>"),
        isUser: false,
        youtube: botResponse.video == null ? null : botResponse.video.videoId,
        requesttype:
          botResponse.requesttype == null ? null : botResponse.requesttype,
        relevanProduct:
          botResponse.list_product.length > 0 ? botResponse.list_product : null,
        recipeName:
          botResponse.recipe_name == null ? null : botResponse.recipe_name,
        recipeIngredients:
          botResponse.ingredients == null ? null : botResponse.ingredients,
        recipeDirections:
          botResponse.directions == null ? null : botResponse.directions,
      };

      console.log(botMessage.relevanProduct);

      setMessages((messages) => [...messages, botMessage]);


      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // handle add to cart and redirect to cart page
  const handleAddToCart = async (Item: any) => {
    
    const data = {
      id: Item.id,
      name: Item.name,
      price: Item.now_price,
      image: Item.image,
      quantity: 1,
      weight: Item.weight,
      selected: true
    };


    handleAddCart(data);
    Router.push("/Cart");
      

}
      
  
    //handle save 
  const handleSave = async (text : String , recipeName: string, recipeIngredients: string, recipeDirections: string, youtube: string) => {
    console.log('recipe ' + text);

    const nameMatch = text.match(/Name:\s*(.*)/);
    const name = nameMatch ? nameMatch[1] : "";

    const ingredientsMatch = text.match(/Ingredients:\s*(.*)/);
  const ingredients = ingredientsMatch
    ? ingredientsMatch[1].split(",").map((ingredient) => ingredient.trim())
    : null;


    // search directions then split with comma
     const directionsMatch = text.match(/Directions:(.*)/s);
     const directions = directionsMatch
       ? directionsMatch[1]
           .split(/\n\d+\. /)
           .filter((step) => step !== "" && step !== " ")
           .map((step) => step.trim())
       : null;


    
    console.log(directions)
    
    
    const data = {
      recipeName: name,
      recipeIngredients: ingredients,
      recipeDirections: directions,
      recipeVideo: youtube,
      slug: convertToSlug(name),
    };
    console.log(data);


    //save to localstorage
    if (typeof window !== "undefined") {
      let savedRecipes = localStorage.getItem("savedRecipes");
      if (savedRecipes == null) {
        localStorage.setItem("savedRecipes", JSON.stringify([data]));
      } else {
        savedRecipes = JSON.parse(savedRecipes);
        savedRecipes.push(data);
        
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
      }
    }
    setIsSave(true)
  }
      
      


  return (
    <div className="py-16 h-screen  ">
      <Navbar type={"type2"} backUrl="/" title="Chef Ai" />
      <Sidebar cart={cart} />
      <div
        className="flex flex-col relative    bg-white   "
        style={{ minHeight: "100vh" }}
      >
        <div className="flex-1  p-4  mb-20">
          {messages.map((message: Message, index: number) => (
            <div
              key={index}
              className={`${message.isUser ? "text-right" : "text-left"} mb-4 `}
            >
              <div
                style={{ whiteSpace: "pre-line" }}
                className={`${
                  message.isUser
                    ? "bg-primary-green text-white rounded-tl-lg rounded-br-lg"
                    : "bg-gray-200 text-gray-800 rounded-tr-lg rounded-bl-lg"
                } inline-block max-w-xs p-2 text-justify break-words mb-2`}
                dangerouslySetInnerHTML={{ __html: message.html }}
              ></div>

              {!message.isUser && youtube != null ? (
                <div className="text-left mb-2">
                  <div className="bg-gray-200 text-gray-800 rounded-tr-lg rounded-bl-lg inline-block max-w-xs p-2 break-words">
                    Voila! Here{"'"}s a video that matches the recipe you{"'"}re
                    searching for. Enjoy and happy cooking!
                  </div>
                </div>
              ) : null}
              {!message.isUser && youtube != null ? (
                <div className="text-left mb-2 mt-2">
                  <div className="bg-gray-200 text-gray-800 rounded-tr-lg rounded-bl-lg inline-block max-w-xs p-2 break-words">
                    <iframe
                      width="100%"
                      src={"https://www.youtube.com/embed/" + message.youtube}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  {!message.isUser && message.relevanProduct != null ? (
                    <div className="text-left mb-2">
                      <div className="bg-gray-200 text-gray-800 rounded-tr-lg rounded-bl-lg inline-block max-w-xs p-2 break-words ">
                        Need to grab a few ingredients for your recipe? We{"'"}
                        ve got you covered! Shop for your missing ingredients
                        with us
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {!message.isUser && message.relevanProduct != null
                ? message.relevanProduct.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="shadow-md flex flex-col px-2 py-2 max-w-xs  rounded-lg mb-5"
                    >
                      <div className="flex flex-row gap-5  ">
                        <div className="  bg-gray-100  rounded-lg  w-20 h-20  py-8  flex items-center justify-center">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                              "/images/" +
                              item.image_web
                            }
                            width={70}
                            height={70}
                            className="object-cover  "
                            alt={"Image " + item.name}
                          />
                        </div>
                        <div className="flex flex-col gap-1 ">
                          <span>{item.name}</span>
                          <span className="font-semibold">
                           {formatRupiah(item.now_price)}
                          </span>
                          {item.discount_percentage != null && (
                            <div className="flex flex-row items-center">
                              <div className="px-3 bg-[#ffdbe2] rounded-md   ">
                                <span className="text-[#f94d63] text-xs">
                                  {item.discount_percentage}%
                                </span>
                              </div>
                              <span className="text-[#6d7588] ml-2 text-sm line-through ">
                                {formatRupiah(item.price)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-5">
                        <div>
                          <QuantityModal
                            product={item}
                            handleAddCart={handleAddCart}
                            variant={3}
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-primary-green py-2 text-white rounded-md w-full"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
              {!message.isUser &&
                message.requesttype == "REQUEST_RECIPE_INFO" && (
                  <div className=" max-w-xs mt-5">
                    {isSave ? (
                      <button
                        style={{ borderWidth: "1px" }}
                        // onClick={() =>
                        //   handleSave(
                        //     message.recipeName,
                        //     message.recipeIngredients,
                        //     message.recipeDirections,
                        //     message.youtube
                        //   )
                        // }
                        className="bg-white  text-primary-green border-green-500  py-2  rounded-md w-full"
                      >
                        Great Recipe has been saved
                      </button>
                    ) : (
                      <button
                        style={{ borderWidth: "1px" }}
                        onClick={() =>
                          handleSave(
                            message.html,

                            message.recipeName,
                            message.recipeIngredients,
                            message.recipeDirections,
                            message.youtube
                          )
                        }
                        className="bg-white  text-primary-green border-green-500  py-2  rounded-md w-full"
                      >
                        Save Recipe
                      </button>
                    )}
                  </div>
                )}
            </div>
          ))}
          {/* // if user first time chat */}
          {messages.length === 0 && (
            <div className="text-center ">
              <img src="/chef-ai.png" alt="chef-ai" className="w-1/2 mx-auto" />
              <h1 className="header1 mb-4 text-2xl ">Chef Ai</h1>
              <p className="text-gray-500">
                Welcome to Chef Ai's kitchen! How can I help you today
              </p>
              {/* <p className="text-gray-800 mb-2 mt-2">Example Command</p> */}
              <div
                className="flex flex-col mt-4"
                onClick={() => {
                  setInputText(" Search for me a recipe for fried rice");
                }}
              >
                {/* // box example command */}
                <div className="border border-gray-200 px-2 py-4 rounded-md cursor-pointer ">
                  {/* // eslint-disable-next-line react/no-unescaped-entities */}
                  <span className="text-gray-500">
                    Search for me a recipe for fried rice
                  </span>
                </div>
              </div>
              <div
                className="flex flex-col mt-4"
                onClick={() => {
                  setInputText("I want a recipe for fried rice with lamb meat");
                }}
              >
                {/* // box example command */}
                <div className="border border-gray-200 px-2 py-4 rounded-md  cursor-pointer ">
                  {/* // eslint-disable-next-line react/no-unescaped-entities */}
                  <span className="text-gray-500">
                    I want a recipe for fried rice with lamb meat
                  </span>
                </div>
              </div>
              <div
                className="flex flex-col mt-4"
                onClick={() => {
                  setInputText("             What is lamb meat ? ");
                }}
              >
                {/* // box example command */}
                <div className="border border-gray-200 px-2 py-4 rounded-md  cursor-pointer ">
                  {/* // eslint-disable-next-line react/no-unescaped-entities */}
                  <span className="text-gray-500">What is lamb meat ?</span>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-left">
              <div className="bg-gray-200 text-gray-800 rounded-tr-lg rounded-bl-lg inline-block max-w-xs p-2 break-words">
                Chef AI is busy typing up some delicious ideas just for you...
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto flex fixed bottom-0  w-full justify-between p-4"
        >
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="flex-1 mr-2 p-2 rounded-lg border border-gray-300"
          />
          <button
            type="submit"
            className="p-2 bg-primary-green text-white rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
