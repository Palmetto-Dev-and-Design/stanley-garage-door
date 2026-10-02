import { CaretRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import CallToAction from "@/components/sections/CallToAction";
import ServiceArea from "@/components/sections/ServiceArea";
import { buildMeta } from "@/utils/meta";

export const metadata = buildMeta({
  title: "About Us",
  description:
    "Meet the team behind Stanley Garage Door Specialist, a local garage door company focused on honest pricing and dependable service.",
  path: "/about",
});

const timeline = [
  {
    year: "1960",
    event: "David Stanley starts Garage Door Specialist",
    connector: "dot",
  },
  { year: "1980", event: "Kirk Stanley takes the reins", connector: "arrow" },
  {
    year: "Today",
    event: "Ryan is carrying the family business forward",
    connector: null,
  },
] as const;

const values = [
  {
    title: "Straightforward service",
    description: "We’ll tell you what we find and what it takes to fix it.",
  },
  {
    title: "Safety first",
    description: "If we spot a concern, we’ll explain it and your options.",
  },
  {
    title: "Repair when we can",
    description: "We won’t sell you a replacement you don’t need.",
  },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      {/* The photo is cropped along its right side, so it always sits flush
          against the right edge of the screen instead of inside the container. */}
      <section className="overflow-hidden bg-primary text-white md:flex md:items-end">
        <div className="page-container flex flex-col items-center pt-16 text-center md:mx-0 md:w-auto md:max-w-none md:flex-1 md:items-start md:self-center md:py-10 md:pr-8 md:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] md:text-left lg:py-12 lg:pr-12">
          <h1 className="heading-3 md:heading xl:text-[3.5rem]">About us</h1>
          <p className="mt-4 max-w-sm para-sm md:max-w-md md:para-lg">
            Stanley Garage Door Specialist is a third-generation, family-owned
            business serving the Tampa Bay area for over 60 years.
          </p>
        </div>
        <Image
          src="/ryan-kirk.png"
          alt="Ryan and Kirk Stanley"
          width={2630}
          height={2392}
          priority
          sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 100vw"
          className="mt-6 ml-auto block h-auto w-full md:mt-10 md:w-1/2 md:shrink-0 lg:mt-12 xl:w-[45vw] xl:max-w-4xl"
        />
      </section>

      {/* History */}
      <section className="bg-neutral-50">
        <div className="page-container section-padding grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="heading-3 text-foreground xl:heading-2">
              Three generations
              <br />
              of experience
            </h2>
            <p className="mt-6 para-md text-foreground xl:para-lg">
              <strong className="font-semibold">
                It started with David Stanley and a simple philosophy: customer
                first.
              </strong>{" "}
              That same approach continued with Kirk and remains at the heart of
              how Ryan runs the business today.
            </p>
          </div>

          {/* Horizontal on mobile/tablet, vertical on desktop */}
          <ol className="relative grid grid-cols-3 gap-4 rounded-2xl bg-white p-5 shadow-section md:gap-8 md:p-8 lg:grid-cols-1 lg:gap-0 lg:py-4 lg:pr-8 lg:pl-14 lg:before:absolute lg:before:inset-y-0 lg:before:left-6 lg:before:w-px lg:before:bg-primary-active/50">
            {timeline.map(({ year, event, connector }) => (
              <li
                key={year}
                className="flex flex-col gap-4 lg:relative lg:flex-row lg:items-center lg:gap-6 lg:py-6 lg:before:absolute lg:before:top-1/2 lg:before:-left-8 lg:before:size-1.5 lg:before:-translate-x-1/2 lg:before:-translate-y-1/2 lg:before:rounded-full lg:before:bg-primary-active"
              >
                <div className="flex items-center gap-3">
                  <span className="para-md font-bold uppercase text-primary lg:w-20 lg:shrink-0 lg:normal-case xl:para-lg xl:font-bold">
                    {year}
                  </span>
                  {connector && (
                    <span
                      aria-hidden
                      className="flex flex-1 items-center text-primary-active/70 lg:hidden"
                    >
                      <span className="h-px flex-1 bg-current" />
                      {connector === "dot" ? (
                        <span className="size-1.5 rounded-full bg-current" />
                      ) : (
                        <CaretRightIcon
                          size={12}
                          weight="bold"
                          className="-ml-1.5"
                        />
                      )}
                    </span>
                  )}
                </div>
                <p className="para-sm text-foreground-subtle xl:para-md">
                  {event}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <hr className="text-neutral-200" />

      {/* Values */}
      <section className="page-container section-padding">
        <h2 className="heading-3 text-foreground xl:heading-2">
          Service that
          <br />
          puts customers first
        </h2>
        <p className="mt-6 max-w-2xl para-md text-foreground xl:para-lg">
          We&apos;re a small, local company, and our reputation means everything
          to us. Much of our business comes from repeat customers and referrals,
          so earning your trust and doing the job right matters.
        </p>
        <ul className="mt-10 grid gap-10 px-5 md:grid-cols-3 md:gap-8 md:px-0 lg:gap-12">
          {values.map(({ title, description }) => (
            <li key={title} className="flex items-start gap-4">
              <CheckIcon
                size={28}
                weight="bold"
                className="shrink-0 text-primary"
              />
              <div>
                <h3 className="para-md font-bold uppercase text-foreground md:normal-case xl:para-lg xl:font-bold">
                  {title}
                </h3>
                <p className="mt-2 para-sm text-foreground-subtle md:mt-1 xl:para-md">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Service area */}
      <ServiceArea />

      {/* CTA */}
      <CallToAction />
    </>
  );
};

export default About;
