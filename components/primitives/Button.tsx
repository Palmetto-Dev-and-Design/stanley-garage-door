import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-hover disabled:bg-primary-disabled",
        secondary: "bg-secondary text-white hover:bg-secondary-hover",
        tertiary: "bg-tertiary text-primary hover:bg-tertiary-hover",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-tertiary-hover",
        ghost: "bg-transparent text-black hover:text-primary",
      },
      size: {
        default: "h-10 px-3 para-sm",
        lg: "h-12 px-4 para-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export default function Button({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
