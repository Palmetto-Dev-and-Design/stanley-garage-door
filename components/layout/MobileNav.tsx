"use client";

import { DotsNineIcon, XIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import NavLink from "../NavLink";
import Button from "../primitives/Button";

const MobileNav = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const toggle = () => setOpenPath(open ? null : pathname);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenPath(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
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
        className={cn(
          "absolute inset-x-0 top-full z-50 origin-top border-b bg-background px-4 py-4 shadow-md transition duration-200",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <NavLink className="flex-col items-stretch gap-2 pr-0" />
        <Button href="/contact" size="lg" className="mt-4 w-full">
          Contact us
        </Button>
      </nav>
    </div>
  );
};

export default MobileNav;
