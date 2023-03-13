import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function MyRecipe() {

    const [list, setList] = useState([]);

    // get for localstorage
    useEffect(() => {
        const data = localStorage.getItem("savedRecipes");
        if (data) {
            setList(JSON.parse(data));
        }



    }, [ ]);

  return (
    <div className="py-16  ">
      <Navbar type={"type1"} />

      <div className="bg-[#acdea6]  px-4 sm:px-4 lg:px-4 lg:py-4 h-screen  ">
        <div className=" mt-5 bg-[#f5f4e9] py-2 rounded-xl px-4">
          <h1 className=" text-left  text-lg font-semibold mb-2 text-[#22561e] ">
            Your amazing recipes 
          </h1>

          {/*  user saved recopi*/}

          <div className="flex text-left  style 	">
            <ul>
              {list.map((item: any, index) => (
                <Link href={"/chef-ai/my-recipe/" + item.slug} key={index}>
                  <li
                    className="
                      text-[#22561e]
                            text-left
                            mt-2
                            mb-2
                            cursor-pointer
                            hover:text-primary-green
                            flex 
                            flex-row
                            gap-2
                            
                            
                            "
                  >
                    <span className="text-gray-500">{index + 1}</span>

                    {item.recipeName.replace(/[^a-zA-Z ]/g, "")}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default MyRecipe