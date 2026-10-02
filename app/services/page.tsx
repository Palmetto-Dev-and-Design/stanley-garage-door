import {
  BroadcastIcon,
  PhoneCallIcon,
  ScrewdriverIcon,
  WarehouseIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Button from "@/components/primitives/Button";
import CallToAction from "@/components/sections/CallToAction";
import ServiceArea from "@/components/sections/ServiceArea";
import { cn } from "@/lib/utils";

const springPhotos = [
  {
    src: "/spring-before.png",
    alt: "Broken garage door torsion spring before repair",
    label: "Before",
    tagClass: "bg-secondary text-white",
  },
  {
    src: "/spring-after.png",
    alt: "New garage door torsion spring after repair",
    label: "After",
    tagClass: "bg-white text-primary",
  },
];

const serviceList = [
  {
    Icon: ScrewdriverIcon,
    title: "Garage door repairs",
    items: ["Cables", "Tracks", "Rollers", "General repairs"],
  },
  {
    Icon: BroadcastIcon,
    title: "Garage door openers",
    items: [
      "Opener repair",
      "Opener installation",
      "Including LiftMaster products",
    ],
  },
  {
    Icon: WarehouseIcon,
    title: "New garage doors",
    items: [
      "Installation and replacement",
      "Including Clopay and C.H.I. products",
    ],
  },
];

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="page-container section-padding flex flex-col items-center lg:flex-row lg:gap-12">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="heading-3 md:heading xl:text-[3.5rem] text-primary">
            Garage door services
          </h1>
          <p className="my-6 max-w-120 para-sm md:para-lg text-center lg:text-left">
            Reliable repairs, honest recommendations and 60+ years in the
            business.
          </p>
        </div>
        <Image
          src={"/service-hero.png"}
          alt="A frontal view of a garage door"
          width={350}
          height={218}
          className="h-auto md:w-120 lg:ml-auto xl:w-136"
        />
      </section>

      {/* Spring section */}
      <section className="section-padding bg-primary text-white">
        <div className="page-container flex flex-col items-center lg:flex-row lg:gap-12 xl:gap-16">
          <div className="flex flex-col items-center lg:max-w-xs lg:shrink-0 lg:flex-row lg:items-start lg:gap-4 xl:max-w-sm">
            <div className="mb-6 flex shrink-0 items-center justify-center rounded-full bg-white p-3 text-primary lg:mb-0 lg:p-2">
              <WrenchIcon size={32} weight="fill" className="lg:size-6" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="heading-3 xl:heading-2">
                Spring repair & conversion
              </h2>
              <p className="mt-3 para-md xl:para-lg">
                Torsion springs, extension springs and torsion conversions.
              </p>
            </div>
          </div>
          <div className="mt-8 grid w-full max-w-sm grid-cols-1 gap-4 md:mt-10 md:max-w-none md:grid-cols-2 md:gap-6 lg:mt-0 lg:flex-1 xl:gap-8">
            {springPhotos.map(({ src, alt, label, tagClass }) => (
              <div key={label} className="relative overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={alt}
                  width={700}
                  height={356}
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 384px"
                  className="h-auto w-full"
                />
                <span
                  className={cn(
                    "absolute left-0 top-0 size-20 [clip-path:polygon(0_0,100%_0,0_100%)] xl:size-24",
                    tagClass,
                  )}
                >
                  <span className="absolute left-7 top-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 para-xs font-bold uppercase xl:left-8.5 xl:top-8.5 xl:para-sm xl:font-bold">
                    {label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service list */}
      <section className="page-container section-padding flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-6">
        {serviceList.map(({ Icon, title, items }) => (
          <div
            key={title}
            className="flex items-start gap-5 p-5 lg:gap-6 lg:px-10 lg:py-8"
          >
            <Icon size={40} weight="fill" className="shrink-0 text-primary" />
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="para-md font-bold text-foreground xl:para-lg xl:font-bold">
                {title}
              </h3>
              <ul className="list-disc para-sm text-foreground-subtle xl:para-md">
                {items.map((item) => (
                  <li key={item} className="ms-6">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-start gap-6 rounded-xl bg-primary px-5 py-8 text-tertiary shadow-section lg:col-span-3 lg:flex-row lg:items-center lg:gap-8 lg:rounded-2xl lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-1 lg:flex-row lg:items-center lg:gap-10">
            <h2 className="heading-3 xl:heading-2">
              Not sure what&rsquo;s wrong?
            </h2>
            <p className="para-md xl:para-lg">
              Tell us what&rsquo;s going on &amp; we&rsquo;ll help figure it
              out.
            </p>
          </div>
          <Button
            href="/contact"
            variant="tertiary"
            size="lg"
            className="gap-2"
          >
            <PhoneCallIcon size={20} weight="fill" className="text-secondary" />
            Contact us
          </Button>
        </div>
      </section>
      {/* Service area */}
      <ServiceArea />

      {/* CTA */}
      <CallToAction description="Give us a call or text and tell us what’s going on." />
    </>
  );
};

export default Services;
