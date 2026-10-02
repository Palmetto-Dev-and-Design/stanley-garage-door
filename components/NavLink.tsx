import { usePathname } from "next/navigation";
import { navigation } from "@/constants";
import { cn } from "@/lib/utils";
import Button from "./primitives/Button";

const NavLink = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "flex flex-col text-center md:text-left md:flex-row gap-6 pr-6 xl:gap-8 xl:pr-8",
        className,
      )}
    >
      {navigation.map(({ title, link }) => {
        const isActive =
          link === "/"
            ? pathname === "/"
            : pathname === link || pathname.startsWith(`${link}/`);

        return (
          <li key={title}>
            <Button
              variant={"ghost"}
              href={link}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "uppercase xl:para-md xl:font-bold",
                isActive && "text-primary",
              )}
            >
              {title}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLink;
