import { PhoneTransferIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CallToActionProps = {
  description?: ReactNode;
};

export default function CallToAction({
  description = "Give us a call or text and tell us what’s going on.",
}: CallToActionProps) {
  return (
    <section className="section-padding relative overflow-hidden bg-primary text-white">
      <Image
        src="/palm-trees.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center lg:object-contain lg:object-left opacity-20"
      />
      <div className="page-container relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 xl:gap-6">
          <h2 className="heading-3 text-center xl:heading-2">
            Need help with your garage door?
          </h2>
          <p className="text-center xl:para-lg">{description}</p>
          <p className="flex items-center justify-center gap-2">
            <PhoneTransferIcon
              size={28}
              weight="fill"
              className="text-white xl:size-9"
            />
            <Link
              href="tel:+17273205799"
              className="heading-4 font-bold xl:text-2xl"
            >
              (727) 320-5799
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
