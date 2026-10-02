import CallToAction from "@/components/sections/CallToAction";
import GalleryCarousel from "@/components/sections/GalleryCarousel";
import { buildMeta } from "@/utils/meta";

export const metadata = buildMeta({
  title: "Gallery",
  description:
    "See photos of garage door installations, repairs, and upgrades completed by Stanley Garage Door Specialist.",
  path: "/gallery",
});

const Gallery = () => {
  return (
    <>
      <section className="page-container section-padding flex flex-col items-center">
        <h1 className="heading-3 text-center text-primary md:heading xl:text-[3.5rem]">
          Our work
        </h1>
        <p className="mt-4 mb-8 max-w-md text-center para-sm text-foreground md:mb-10 md:para-lg">
          Take a look at some of the garage door repairs, installations and
          replacements we&rsquo;ve completed for homeowners in the area.
        </p>
        <GalleryCarousel />
      </section>

      {/* CTA */}
      <CallToAction />
    </>
  );
};

export default Gallery;
