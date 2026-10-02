"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lightbox from "@/components/Lightbox";
import { gallery } from "@/constants";
import { cn } from "@/lib/utils";

const THUMBS_PER_PAGE = 4;
const pageCount = Math.ceil(gallery.length / THUMBS_PER_PAGE);
const count = gallery.length;
// How long scrolling must pause before a swipe counts as finished.
const SETTLE_MS = 120;

type SlideProps = {
  photo: (typeof gallery)[number];
  clone?: boolean;
  priority?: boolean;
};

const Slide = ({ photo, clone = false, priority = false }: SlideProps) => (
  <div
    aria-hidden={clone || undefined}
    className="relative aspect-[4/3] w-full shrink-0 snap-center md:aspect-[16/10]"
  >
    <Image
      src={photo.image}
      alt={clone ? "" : photo.alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 1024px, 100vw"
      className="object-cover"
    />
  </div>
);

export default function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Slide being scrolled to by a thumbnail/dot click, so in-between slides
  // passed during the smooth scroll don't flash as selected.
  const targetRef = useRef<number | null>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  // For the infinite loop, the track is [last clone, ...photos, first clone].
  // The leading clone is only added after mount so the server-rendered HTML
  // starts on photo 1 instead of the clone.
  const [mounted, setMounted] = useState(false);
  const offset = mounted ? 1 : 0;

  useEffect(() => {
    setMounted(true);
    return () => clearTimeout(settleRef.current);
  }, []);

  // Keep the visible photo in place when the leading clone is inserted.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (mounted && track) track.scrollLeft = track.clientWidth;
  }, [mounted]);

  const current = gallery[selected];
  const page = Math.floor(selected / THUMBS_PER_PAGE);
  const thumbs = gallery.slice(
    page * THUMBS_PER_PAGE,
    (page + 1) * THUMBS_PER_PAGE,
  );

  const select = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    targetRef.current = index;
    setSelected(index);
    track.scrollTo({
      left: (index + offset) * track.clientWidth,
      behavior: "smooth",
    });
  };

  // Move one photo; past either end this lands on a clone and the loop takes over.
  const step = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    targetRef.current = null;
    track.scrollTo({
      left: (selected + offset + direction) * track.clientWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const position = Math.round(track.scrollLeft / track.clientWidth);
    const index = (position - offset + count) % count;

    // Once a swipe lands on a clone, jump to the real photo it copies.
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      const settled = Math.round(track.scrollLeft / track.clientWidth);
      const width = track.clientWidth;
      if (offset && settled === 0) {
        track.scrollTo({ left: count * width, behavior: "instant" });
      } else if (settled === count + offset) {
        track.scrollTo({ left: offset * width, behavior: "instant" });
      }
    }, SETTLE_MS);

    if (targetRef.current !== null) {
      if (index === targetRef.current) targetRef.current = null;
      return;
    }
    if (index !== selected) setSelected(index);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
      <div className="relative w-full">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onPointerDown={() => {
            targetRef.current = null;
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {mounted && <Slide photo={gallery[count - 1]} clone />}
          {gallery.map((photo, i) => (
            <Slide key={photo.key} photo={photo} priority={i === 0} />
          ))}
          <Slide photo={gallery[0]} clone />
        </div>
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label={`View larger: ${current.alt}`}
          className="absolute right-3 top-3 rounded-md bg-primary p-1.5 text-white transition-colors hover:bg-primary-hover"
        >
          <MagnifyingGlassPlusIcon size={24} />
        </button>
        {[
          {
            direction: -1 as const,
            label: "Previous photo",
            Icon: CaretLeftIcon,
          },
          { direction: 1 as const, label: "Next photo", Icon: CaretRightIcon },
        ].map(({ direction, label, Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => step(direction)}
            aria-label={label}
            className={cn(
              "absolute top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 text-primary shadow-md transition-colors hover:bg-white lg:block",
              direction === -1 ? "left-4" : "right-4",
            )}
          >
            <Icon size={24} weight="bold" />
          </button>
        ))}
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
        image={zoomed ? current : null}
        onClose={() => setZoomed(false)}
      />
    </div>
  );
}
