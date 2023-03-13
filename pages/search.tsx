import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import formatRupiah from "@/hooks/RupiahFormater";
import Link from "next/link";
import convertToSlug from "@/helper/slug";
import Cookies from "js-cookie";

type Product = {
  id: number;
  name: string;
};

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [historyView, setHistoryView] = useState<Product[]>([]);

  const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel("Request cancelled");
    };
  }, [source]);
  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, [searchResults]);
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<any>(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/products/search?q=${searchValue}`
      );

      setSearchResults(response.data.data);
      if (searchValue.trim() !== "") {
        setSearchHistory((history) => {
          if (history.length >= 10) {
            history.shift();
          }
          const newHistory = [
            searchValue.trim(),
            ...history
              .filter(
                (historyItem) => historyItem.trim() !== searchValue.trim()
              )
              .slice(0, 9),
          ];
          localStorage.setItem("searchHistory", JSON.stringify(newHistory));
          // check auth 
         
            return newHistory;
        });
          const token = Cookies.get("token");

         if (token) {
           // save data to database
           const response = await axios.post(
             `${process.env.NEXT_PUBLIC_API_BACKEND}/saveHistory`,
             {
               search_term: searchValue,
             },
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );
             console.log(response);
         }
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(error.message);
      } else {
        setError("An error occurred while fetching search results.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        handleSearch();
      } else {
        setSearchResults([]);
        localStorage.setItem("searcchHistory", JSON.stringify(searchValue));
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // history view in localstorage
  useEffect(() => {
    const historyView = localStorage.getItem("historyView");
    if (historyView) {
      setHistoryView(JSON.parse(historyView));
    }
  }, []);

  const renderSearchBar = () => (
    <form className="ml-4 flex-1 w-full">
      <label htmlFor="search" className="sr-only">
        Cari
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="search"
          value={searchValue}
          onChange={handleInputChange}
          id="search"
          name="search"
          className="form-input "
          placeholder="Search 'Apple Fruit '"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pl-4 pr-4">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            className="w-4"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.199 17.035a8.312 8.312 0 1 1 1.837-1.837l4.584 4.585a1.299 1.299 0 1 1-1.837 1.837l-4.584-4.585Zm.827-6.723a5.714 5.714 0 1 1-11.429 0 5.714 5.714 0 0 1 11.429 0Z"
              fill="#FEFEFE"
            ></path>
          </svg>
        </div>
      </div>
    </form>
  );
  const renderLogo = () => (
    <div className="h-8">
      <Image src="/logo.png" width={33} height={33} alt="Logo freshmarket" />
    </div>
  );

  return (
    <div className="py-14">
      <Navbar
        type={"type1"}
        isSearchPage={true}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {error && <p>{error}</p>}
      {searchValue != "" ? (
        <div className="bg-white  px-4 sm:px-4 lg:px-4 lg:py-4   h-screen ">
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                   href={`/product/${convertToSlug(result.name)}`}
                >
                  <li className="cursor-pointer mb-5">
                    <div className="flex flex-row gap-5 ">
                      <div className="bg-gray-100  rounded-lg   w-24   py-8  flex items-center justify-center">
                        <Image
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                            "/images/" +
                            result.image
                          }
                          width={40}
                          height={40}
                          className="object-cover h-full "
                          alt={"Image " + result.name}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-xl font-medium  ">{result.name}</h2>
                        {result.discount_id != null && (
                          <div className="flex flex-row  mt-2 items-center">
                            <div className="px-4  bg-[#ffdbe2] rounded-md   ">
                              <span className="text-[#f94d63] text-xs">
                                {result.discount_percentage}%
                              </span>
                            </div>

                            <span className="text-[#6d7588] ml-2 text-xs line-through ">
                              {formatRupiah(result.price)}
                            </span>
                          </div>
                        )}
                        <span className="text-primary-green font-semibold mt-1 line  text-">
                          {formatRupiah(result.now_price)}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="bg-white  px-4 sm:px-4 lg:px-4 lg:py-4   h-screen ">
          {/* /// Product terakhir dilihat disini */}

          {historyView.length > 0 && (
            <div className="mb-10">
              <h2 className="header1 mb-10">Produk Terakhir Dilihat : </h2>
              <ul className=" flex flex-row  gap-5 w-full overflow-y-auto  ">
                {historyView.map((historyItem, index) => (
                  <li key={index}>
                    <div className="bg-gray-100  rounded-lg  h-28  w-28 py-8  flex items-center justify-center hover:shadow-lg hover:opacity-90 cursor-pointer">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_BACKEND +
                          "/images/" +
                          historyItem.image
                        }
                        width={80}
                        height={80}
                        className="object-cover h-full "
                        alt={"Image " + historyItem.name}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ====  ==== */}

          {searchValue == "" && (
            <ul>
              <li>
                {searchHistory.length > 0 && (
                  <div>
                    <h2 className="header1">Riwayat Pencarian : </h2>
                    <ul className="mt-3 ">
                      {searchHistory.map((historyItem, index) => (
                        <li
                          onClick={() => setSearchValue(historyItem)}
                          className="mb-1 text-0 text-[#5c5c5c]  cursor-pointer  hover:bg-gray-100 px-1 py-1"
                          key={index}
                        >
                          {historyItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Search;
