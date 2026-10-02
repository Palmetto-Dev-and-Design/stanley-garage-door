"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// How long scrolling must pause before a swipe counts as finished.
const SETTLE_MS = 120;

/**
 * Infinite-loop, swipeable carousel built on a CSS scroll-snap track.
 *
 * The track renders [last clone, ...items, first clone]. When a swipe settles
 * on a clone, it jumps instantly to the real item it copies. The leading clone
 * is only added after mount so server-rendered HTML starts on the first item.
 */
export function useLoopCarousel<T>(items: readonly T[]) {
  const count = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  // Item being scrolled to by select(), so in-between items passed during a
  // smooth scroll don't flash as selected.
  const targetRef = useRef<number | null>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);
  const offset = mounted ? 1 : 0;

  useEffect(() => {
    setMounted(true);
    return () => clearTimeout(settleRef.current);
  }, []);

  // Keep the visible item in place when the leading clone is inserted.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (mounted && track) track.scrollLeft = track.clientWidth;
  }, [mounted]);

  const select = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    if (!track) return;
    targetRef.current = index;
    setSelected(index);
    track.scrollTo({ left: (index + offset) * track.clientWidth, behavior });
  };

  // Move one item; past either end this lands on a clone and the loop takes over.
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

  const slides = [
    ...(mounted
      ? [
          {
            key: "clone-start",
            item: items[count - 1],
            index: count - 1,
            clone: true,
          },
        ]
      : []),
    ...items.map((item, index) => ({
      key: `${index}`,
      item,
      index,
      clone: false,
    })),
    { key: "clone-end", item: items[0], index: 0, clone: true },
  ];

  const trackProps = {
    ref: trackRef,
    onScroll: handleScroll,
    // A swipe interrupts any select() scroll still in progress.
    onPointerDown: () => {
      targetRef.current = null;
    },
  };

  return { trackProps, slides, selected, select, step };
}
