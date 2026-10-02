"use client";

import Image from "next/image";
import Link from "next/link";
import NavLink from "../NavLink";
import Button from "../primitives/Button";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="relative flex items-center justify-between px-4 py-4 md:px-12 xl:px-16 xl:py-5 shadow-[0_2px_2px_-2px_rgba(0,0,0,0.4)]">
      <Link href="/">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={166}
          height={44}
          className="xl:h-auto xl:w-50"
        />
      </Link>
      <nav className="hidden items-center md:flex">
        <NavLink />
        <Button href="/contact" className="xl:h-12 xl:px-4 xl:para-md">
          Contact us
        </Button>
      </nav>

      <MobileNav />
    </header>
  );
};

export default Header;
