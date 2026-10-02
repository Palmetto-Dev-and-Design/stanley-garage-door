"use client";

import { DotsNineIcon, PhoneTransferIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/constants";
import { cn } from "@/lib/utils";
import { isActiveLink } from "../NavLink";
import Button from "../primitives/Button";

// Desktop reaches Home via the logo and Contact via its button, so only the
// mobile menu lists them.
const links = [
  { title: "Home", link: "/" },
  ...navigation,
  { title: "Contact", link: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const [openPath, setOpenPath] = useState<string | null>(null);
  // Where the header ends, so the menu fills the rest of the screen.
  const [top, setTop] = useState(0);
  const open = openPath === pathname;

  const toggle = () => {
    if (!open) {
      const header = containerRef.current?.closest("header");
      setTop(Math.max(0, header?.getBoundingClientRect().bottom ?? 0));
    }
    setOpenPath(open ? null : pathname);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenPath(null);
    };

    // Stop the page scrolling behind the full-screen menu.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="md:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex size-10 cursor-pointer items-center justify-center rounded-md hover:bg-primary hover:text-white"
      >
        {open ? <XIcon size={24} /> : <DotsNineIcon size={24} weight="bold" />}
      </button>

      <nav
        id="mobile-menu"
        inert={!open}
        style={{ top }}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-y-auto bg-surface px-5 pt-10 pb-8 transition duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <p className="px-4 para-sm font-semibold uppercase text-primary">
          Navigation
        </p>
        <ul className="mt-4">
          {links.map(({ title, link }) => {
            const isActive = isActiveLink(pathname, link);
            return (
              <li key={title} className="border-b border-neutral-200">
                <Link
                  href={link}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-4 py-3 text-xl text-foreground hover:text-primary",
                    isActive && "text-primary",
                  )}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex flex-col items-center gap-3 pt-10 text-center">
          <Button
            href="tel:+17273205799"
            size="lg"
            className="h-auto w-full max-w-xs gap-2 px-8 py-4"
          >
            <PhoneTransferIcon weight="fill" />
            Call (727) 320-5799
          </Button>
          <p className="para-xs">
            <span className="block font-semibold text-foreground">
              Family-owned and operated
            </span>
            <span className="mt-1 block text-foreground-subtle">
              Serving Tampa Bay and Pinellas County
            </span>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
