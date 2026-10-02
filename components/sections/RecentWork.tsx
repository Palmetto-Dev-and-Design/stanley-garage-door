"use client";

import { ArrowUpRightIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { galleryPreview } from "@/constants";

export default function RecentWork() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const open = (index: number) => {
    setSelected(index);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const current = selected !== null ? galleryPreview[selected] : null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="heading-3 mb-6 xl:heading-2 xl:mb-10">Recent work</h2>

      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-4">
        {galleryPreview.map(({ key, image, alt }, i) => (
          <button
            key={key}
            type="button"
            onClick={() => open(i)}
            aria-label={`View larger: ${alt}`}
            className="relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl"
          >
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 1152px) 280px, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Link
        href="/gallery"
        className="para-lg mt-4 flex items-center justify-end gap-2 font-bold text-primary"
      >
        View gallery <ArrowUpRightIcon size={20} className="text-secondary" />
      </Link>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
        className="m-auto h-[85vh] w-[92vw] max-w-5xl bg-transparent p-0 backdrop:bg-black/80"
      >
        {current && (
          <div className="relative h-full w-full">
            <Image
              src={current.image}
              alt={current.alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
            >
              <XIcon size={24} />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
