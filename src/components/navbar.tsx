"use client";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   navigationMenuTriggerStyle,
// } from "./ui/navigation-menu";
// import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
// import Image from "next/image";
// import logo from "../../public/assets/images/Horizontal Putih Merah 0-2.png";
// import Link from "next/link";
import { HandCoins, Info, MessageCircle, Users } from "lucide-react";
import { FloatingNav } from "./ui/floating-navbar";

export function Navbar() {
  const navItems = [
    {
      name: "About",
      link: "https://gamatecha.com/",
      icon: <Info className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Services",
      link: "https://gamatecha.com/",
      icon: <HandCoins className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Clients",
      link: "https://gamatecha.com/",
      icon: <Users className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "https://gamatecha.com/",
      icon: (
        <MessageCircle className="h-6 w-6 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
