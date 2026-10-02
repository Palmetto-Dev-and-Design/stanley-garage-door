"use client";

import { MagnifyingGlassPlusIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import CarouselArrows from "@/components/CarouselArrows";
import Lightbox from "@/components/Lightbox";
import { gallery } from "@/constants";
import { useLoopCarousel } from "@/lib/useLoopCarousel";
import { cn } from "@/lib/utils";

const THUMBS_PER_PAGE = 4;
const pageCount = Math.ceil(gallery.length / THUMBS_PER_PAGE);

export default function GalleryCarousel() {
  const { trackProps, slides, selected, select, step } =
    useLoopCarousel(gallery);
  const [zoomed, setZoomed] = useState(false);

  const current = gallery[selected];
  const page = Math.floor(selected / THUMBS_PER_PAGE);
  const thumbs = gallery.slice(
    page * THUMBS_PER_PAGE,
    (page + 1) * THUMBS_PER_PAGE,
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
      <div className="relative w-full">
        <div
          {...trackProps}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map(({ key, item, clone }) => (
            <div
              key={key}
              aria-hidden={clone || undefined}
              className="relative aspect-[4/3] w-full shrink-0 snap-center md:aspect-[16/10]"
            >
              <Image
                src={item.image}
                alt={clone ? "" : item.alt}
                fill
                priority={key === "0"}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label={`View larger: ${current.alt}`}
          className="absolute right-3 top-3 cursor-pointer rounded-md bg-primary p-1.5 text-white transition-colors hover:bg-primary-hover"
        >
          <MagnifyingGlassPlusIcon size={24} />
        </button>
        <CarouselArrows onStep={step} />
      </div>

      <div className="mt-2 grid w-full grid-cols-4 gap-2 md:mt-3 md:gap-3">
        {thumbs.map(({ key, image, alt }, i) => {
          const index = page * THUMBS_PER_PAGE + i;
          return (
            <button
              key={key}
              type="button"
              onClick={() => select(index)}
              aria-label={`Show: ${alt}`}
              aria-current={index === selected}
              className={cn(
                "relative aspect-square cursor-pointer overflow-hidden rounded-xl ring-primary ring-offset-2 transition",
                index === selected ? "ring-2" : "hover:opacity-80",
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 256px, 25vw"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: dots are static page indexes
            key={i}
            type="button"
            onClick={() => select(i * THUMBS_PER_PAGE)}
            aria-label={`Show photos page ${i + 1}`}
            aria-current={i === page}
            className={cn(
              "size-3 cursor-pointer rounded-full border-2 border-primary md:size-4",
              i === page && "bg-primary",
            )}
          />
        ))}
      </div>

      <Lightbox
        images={gallery}
        index={zoomed ? selected : null}
        onClose={(index) => {
          setZoomed(false);
          select(index, "instant");
        }}
      />
    </div>
  );
}
