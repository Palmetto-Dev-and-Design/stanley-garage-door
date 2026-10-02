import { PhoneTransferIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

type StatusMessageProps = {
  eyebrow: string;
  title: string;
  description: string;
  // Action buttons.
  children: ReactNode;
};

// Shared layout for the 404 and error pages.
export default function StatusMessage({
  eyebrow,
  title,
  description,
  children,
}: StatusMessageProps) {
  return (
    <section className="bg-surface">
      <div className="page-container section-padding flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="para-xs font-semibold uppercase text-primary md:para-lg">
          {eyebrow}
        </p>
        <h1 className="mt-3 heading-3 text-foreground md:heading xl:text-[3.5rem]">
          {title}
        </h1>
        <p className="my-6 max-w-120 para-sm text-foreground md:para-lg">
          {description}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">{children}</div>
        <p className="mt-10 flex items-center gap-2 para-sm text-foreground-subtle md:para-md">
          Need help now?
          <Link
            href="tel:+17273205799"
            className="flex items-center gap-1 font-bold text-primary"
          >
            <PhoneTransferIcon weight="fill" />
            (727) 320-5799
          </Link>
        </p>
      </div>
    </section>
  );
}
