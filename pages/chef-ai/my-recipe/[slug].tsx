import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function MyRecipeDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = React.useState({});
  const [activeMenu, setActiveMenu] = React.useState("description");
  const [loading , setLoading] = React.useState(true)

  useEffect(() => {
    setLoading(true)
    const data = localStorage.getItem("savedRecipes");
    if (data) {
      const list = JSON.parse(data);
      const recipe = list.find((item: any) => item.slug === slug);

      console.log("recipe", recipe);
      setRecipe(recipe);
        
        // replace recipeDirections \n with <br>
        
    }
    setLoading(false)
  }, [slug]);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className="py-16">
      <Navbar type={"type1"} />
      {recipe && (
        <div className="bg-[#acdea6]  px-4 sm:px-4 lg:px-4 lg:py-4  ">
          <div>
            <div className="mt-5 bg-[#f5f4e9] py-2  rounded-md">
              <h1 className=" text-center  text-lg font-semibold text-[#22561e] ">
                {!loading && recipe.recipeName}
              </h1>
            </div>
            <div className="bg-[#f5f4e9]  rounded-md mt-5 px-5 py-5 h-80">
              <iframe
                width="100%"
                height="280px "
                src={"https://www.youtube.com/embed/" + recipe.recipeVideo}
                frameBorder="0"
                className="rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-5 bg-[#f5f4e9] py-2 rounded-xl px-4">
              <h1 className=" text-left  text-lg font-semibold mb-2 text-[#22561e] ">
                Ingredients
              </h1>

              <ul className=" list-disc px-4">
                {!loading &&
                  recipe.recipeIngredients.map((item: any, index: number) => (
                    <li className="text-[#22561e] mb-2" key={index}>
                      <span className="text-[#22561e]">{item}</span>
                    </li>
                  ))}
              </ul>
            </div>
            {/* <div className="mt-5 bg-[#f5f4e9] py-2 rounded-md px-4">
            <h1 className=" text-left  text-lg font-semibold mb-2 text-[#22561e] ">
              You can buy ingredient here
            </h1>
          </div> */}
            <div className="mt-5 bg-[#f5f4e9] py-2 rounded-xl px-4">
              <h1 className=" mb-4 text-left  text-lg font-semibold  text-[#22561e] ">
                How to make it
              </h1>

              <ul className="list-decimal px-4 mb-4 ">
                {/* // list number  */}
                {!loading &&
                   recipe.recipeDirections.map((item: any, index: number) => (
                    <li className="text-[#22561e] mb-2" key={index}>
                      <span className="text-[#22561e]">
                        {item.replace("<br>", "")}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}

export default MyRecipeDetail;
