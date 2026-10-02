"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import { galleryPreview } from "@/constants";

export default function RecentWork() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="page-container section-padding">
      <h2 className="heading-3 mb-6 xl:heading-2 xl:mb-10">Recent work</h2>

      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-4">
        {galleryPreview.map(({ key, image, alt }, i) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelected(i)}
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

      <Lightbox
        images={galleryPreview}
        index={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
