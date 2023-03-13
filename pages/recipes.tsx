import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RecipeBox from "@/components/recipeBox";
import RecipeGroup from "@/components/recipeGroup";
import Image from "next/image";
import React from "react";

function Recipes() {
   interface Recipe {
     id: number;
     name: string;
     imageUrl: string;
     servings: number;
     ingredients: string[];
     instructions: string[];
   }
   const recipeGroup = [
     {
       id: 1,
       name: "Weekly recipe inspiration",
       bgColor: "#acdea6",

       cardColor: "#f5f4e9",
       textColor: "#22561e",
       recipes: [
         {
           id: 1,
           name: "Ayam Katsu Wijen Sangrai",
           imageUrl: "/x.jpeg",
           servings: 4,
           ingredients: ["ayam fillet", "tepung panir", "wijen"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 2,
           name: "Bakso Goreng",
           imageUrl: "/x2.jpg",
           servings: 4,
           ingredients: ["daging sapi", "tepung terigu", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 3,
           name: "Kitsune Udon",
           imageUrl: "/japan/j_1.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 5,
           name: "Onigiri",
           imageUrl: "/japan/j_3.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 10,
           name: "Cassoulet",
           imageUrl: "/france/Cassoulet.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
       ],
     },
     {
       id: 2,
       name: "Japanese food",
       bgColor: "#e9b1cd",
       cardColor: "#ffe7de",
       textColor: "#c3829e",
       flag: "/japan/flag.png",

       recipes: [
         {
           id: 3,
           name: "Kitsune Udon",
           imageUrl: "/japan/j_1.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 4,
           name: "Sushi",
           imageUrl: "/japan/j_2.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 5,
           name: "Onigiri",
           imageUrl: "/japan/j_3.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 6,
           name: "Yakitori ",
           imageUrl: "/japan/j_4.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 7,
           name: "Tempura",
           imageUrl: "/japan/j_5.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
         {
           id: 8,
           name: "Shabu Shabu",
           imageUrl: "/japan/j_6.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },

         {
           id: 8,
           name: "Misou Soup",
           imageUrl: "/japan/j_6.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
       ],
     },
     {
       id: 3,
       name: "France food",
       bgColor: "#18aef5",
       cardColor: "#ffe7de",
       textColor: "#c3829e",
       flag: "/france/flag.png",

       recipes: [
         {
           id: 3,
           name: "Kitsune Udon",
           imageUrl: "/japan/j_1.webp",
           servings: 4,
           ingredients: ["nasi", "bawang merah", "bawang putih"],
           instructions: ["langkah 1", "langkah 2", "langkah 3"],
         },
       ],
     },
   ];
  return (
    <div className="py-16">
      <Navbar type={"type1"} />
      {
        recipeGroup.map((group) => {
          return (
            <RecipeGroup
              title={group.name}
              bgColor={group.bgColor}
              cardColor={group.cardColor}
              textColor={group.textColor}
              flag={group.flag}
              data={group.recipes}
              key={group.id}
            />
          );
              
         })
          
      }
    </div>
  );
}

export default Recipes;
