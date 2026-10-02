import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const arrows = [
  {
    direction: -1,
    label: "Previous photo",
    Icon: CaretLeftIcon,
    side: "left-4",
  },
  { direction: 1, label: "Next photo", Icon: CaretRightIcon, side: "right-4" },
] as const;

type CarouselArrowsProps = {
  onStep: (direction: -1 | 1) => void;
};

// Desktop-only prev/next buttons; smaller screens swipe instead.
export default function CarouselArrows({ onStep }: CarouselArrowsProps) {
  return arrows.map(({ direction, label, Icon, side }) => (
    <button
      key={label}
      type="button"
      onClick={() => onStep(direction)}
      aria-label={label}
      className={cn(
        "absolute top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 text-primary shadow-md transition-colors hover:bg-white lg:block",
        side,
      )}
    >
      <Icon size={24} weight="bold" />
    </button>
  ));
}
