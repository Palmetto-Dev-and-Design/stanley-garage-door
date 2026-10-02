"use client";

import { XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type LightboxProps = {
  image: { image: string; alt: string } | null;
  onClose: () => void;
};

export default function Lightbox({ image, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
      className="m-auto h-[85vh] w-[92vw] max-w-5xl bg-transparent p-0 backdrop:bg-black/80"
    >
      {image && (
        <div className="relative h-full w-full">
          <Image
            src={image.image}
            alt={image.alt}
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
  );
}
