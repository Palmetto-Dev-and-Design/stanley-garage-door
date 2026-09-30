"use client";

import Image from "next/image";
import Link from "next/link";
import NavLink from "../NavLink";
import Button from "../primitives/Button";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="relative flex items-center justify-between px-4 py-4 md:px-12">
      <Link href="/">
        <Image src={"/logo.png"} alt="logo" width={166} height={44} />
      </Link>
      <nav className="hidden items-center md:flex">
        <NavLink />
        <Button href="/contact">Contact us</Button>
      </nav>

      <MobileNav />
    </header>
  );
};

export default Header;
