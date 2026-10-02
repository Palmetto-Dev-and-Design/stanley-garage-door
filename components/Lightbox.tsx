"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CarouselArrows from "@/components/CarouselArrows";
import { useLoopCarousel } from "@/lib/useLoopCarousel";

type Photo = { key: number; image: string; alt: string };

type LightboxProps = {
  images: readonly Photo[];
  // Photo to open on, or null when closed.
  index: number | null;
  // Called with the photo that was showing when the lightbox closed.
  onClose: (index: number) => void;
};

export default function Lightbox({ images, index, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { trackProps, slides, selected, select, step } =
    useLoopCarousel(images);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only open/close when `index` changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      select(index, "instant");
    }
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onClose(selected)}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
      className="m-auto h-[85vh] w-[92vw] max-w-5xl bg-transparent p-0 backdrop:bg-black/80"
    >
      <div className="relative h-full w-full">
        <div
          {...trackProps}
          className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map(({ key, item, clone }) => (
            <div
              key={key}
              aria-hidden={clone || undefined}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <Image
                src={item.image}
                alt={clone ? "" : item.alt}
                fill
                sizes="92vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <CarouselArrows onStep={step} />
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-2 top-2 cursor-pointer rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
        >
          <XIcon size={24} />
        </button>
      </div>
    </dialog>
  );
}
