import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar({ type ,title = '',backUrl = ''}) {
  const renderLogo = () => (
    <div className="h-8">
      <Image
        src="/logo.png"
        width={33}
        height={33}
        alt="Logo freshmarket"
      />
    </div>
  );

  const renderTitle = () => <div className="text-white ml-5">{title}</div>;

  const renderBackButton = () => (
    <Link href={backUrl}>
      <div className="flex items-center gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-left text-white "
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 12l14 0"></path>
          <path d="M5 12l6 6"></path>
          <path d="M5 12l6 -6"></path>
        </svg>
      </div>
    </Link>
  );

  const renderSearchBar = () => (
    <form className="ml-4 flex-1">
      <label htmlFor="search" className="sr-only">
        Cari
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="search"
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

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary-green py-4 z-20">
      <div className="max-w-xl px-4 md:px-4 mx-auto flex justify-between items-center lg:px-4">
        {type === "type1" && (
          <div className="w-full flex flex-row">
            {renderLogo()}
            {renderSearchBar()}
          </div>
        )}
        {type === "type2" && (
          <div className="w-full flex flex-row">
            {renderBackButton()}
            {renderTitle()}
          </div>
        )}
      </div>
    </nav>
  );
}
        
