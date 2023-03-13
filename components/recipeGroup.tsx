import Image from "next/image";
import React from "react";
import RecipeBox from "./recipeBox";

function RecipeGroup({
  title,
  bgColor,
  cardColor,
    textColor,
  flag ,
  data,
}: {
  title: String;
  bgColor: String;
  cardColor: String;
        textColor: String;
    flag :  String;
  data: any;
    }) {
    console.log(data)
   
    return (
      
    <div className={`bg-[${bgColor}]  cursor-pointer px-4 sm:px-4 lg:px-4 lg:py-4  `}>
      <div>
        <div className="mt-5 bg-[#f5f4e9] py-2 rounded-xl">
          <h1
            className={` text-center justify-center gap-2  flex flex-row items-center  text-lg font-semibold text-[${textColor}] `}
          >
                      {title}
                      {
                          flag &&  <Image src={flag} width={40} height={40} alt="flag" />
                      }
          </h1>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-5">
          {data.map((item: any) => {
            return (
              <RecipeBox
                cardColor={cardColor}
                textColor={textColor}
                data={item}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
      {/* / japan theme / */}
    </div>
  );
}

export default RecipeGroup;
