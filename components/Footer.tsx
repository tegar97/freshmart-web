"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useAppContext } from "@/context/AppContext";



type MenuItem = {
  icon: string;
  activeIcon: string;
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    icon: "/menu1-icon.svg",
    activeIcon: "/menu1-icon-active.svg",
    label: "Home",
    href: "/",
  },
  {
    icon: "/menu2-icon.svg",
    activeIcon: "/menu2-icon-active.svg",
    label: "Categories",
    href: "/categories",
  },

  {
    icon: "/menu5-icon.svg",
    activeIcon: "/menu5-icon-active.svg",
    label: "Recipes",
    href: "/recipes",
  },
  {
    icon: "/menu3-icon.svg",
    activeIcon: "/menu3-icon-active.svg",
    label: "My Order",
    href: "/order",
  },
  {
    icon: "/menu4-icon.svg",
    activeIcon: "/menu4-icon-active.svg",
    label: "Profile",
    href: "/profile",
  },
];

function Footer() {
    const { pathname } = useAppContext();

   


  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 max-w-xl px-16 max-h-16 shadow-sm bg-white border-gray-100 border-t-2 mx-auto z-20">
      <div className="flex justify-between items-center h-full">
        {menuItems.map(({ icon, activeIcon, label, href }) => {
          const isActive = pathname === href;

          return (
            <a key={label} href={href} className="flex flex-col items-center">
              <Image
                src={isActive ? activeIcon : icon}
                alt={`Icon ${label}`}
                width={24}
                height={24}
                className={`w-6 h-6 mb-1 object-cover ${
                  isActive
                    ? "text-[#B8B8B8] fill-[#B8B8B8]"
                    : "text-primary-green fill-green-400"
                }`}
              />
              <span
                className={
                  isActive
                    ? "text-xs text-primary-green font-medium "
                    : "text-xs text-[#B8B8B8] font-medium"
                }
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
