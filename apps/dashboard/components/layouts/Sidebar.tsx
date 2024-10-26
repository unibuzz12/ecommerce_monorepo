import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { items } from "./config";
import { SideBarItem } from "./SidebarItem";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section id="sidebar">
      <Link href="/" className="brand">
        <img
          src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
          alt="GFG Logo"
        />
        <span className="text"> admin Panel</span>
      </Link>
      {items.map((item) => {
        const active = item.path ? pathname === item.path : false;
        return (
          <SideBarItem
            active={active}
            icon={item.icon}
            key={item.title}
            path={item.path}
            title={item.title}
          />
        );
      })}
    </section>
  );
};

export default Sidebar;
