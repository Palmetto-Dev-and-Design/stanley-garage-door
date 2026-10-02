import {
  HammerIcon,
  MapPinAreaIcon,
  PhoneTransferIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/primitives/Button";
import ServiceCard from "@/components/ServiceCard";
import CallToAction from "@/components/sections/CallToAction";
import RecentWork from "@/components/sections/RecentWork";
import { brands, services } from "@/constants";
import { buildMeta } from "@/utils/meta";

export const metadata = buildMeta({ path: "/" });

export default function Home() {
  const reasons = [
    {
      icon: (
        <ShieldCheckIcon
          size={28}
          weight="fill"
          className="text-primary shrink-0 xl:size-9"
        />
      ),
      title: "Quality first",
      description:
        "We take the time to understand the problem and find the right fix for your door – not just the quickest one.",
    },
    {
      icon: (
        <MapPinAreaIcon
          size={28}
          weight="fill"
          className="text-primary shrink-0 xl:size-9"
        />
      ),
      title: "Small & Local",
      description:
        "You’re working directly with a local family business, not a large chain or franchise.",
    },
    {
      icon: (
        <HammerIcon
          size={28}
          weight="fill"
          className="text-primary shrink-0 xl:size-9"
        />
      ),
      title: "Resourceful by experience",
      description:
        "Decades in the trade mean we’ve seen a lot – and know how to solve even the not-so-obvious problems.",
    },
  ];

  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-20 lg:left-auto lg:right-[max(5%,calc((100%_-_72rem)/2))] lg:w-[48%] lg:translate-y-20 lg:opacity-100 xl:translate-x-4 xl:translate-y-30 xl:right-[max(8%,calc((100%_-_72rem)/2))]">
          <Image
            src={"/home-hero.png"}
            alt=""
            fill
            className="object-contain object-center lg:object-right xl:object-bottom-right"
          />
        </div>
        <div className="page-container relative z-10 flex min-h-[600px] flex-col items-center justify-center py-16 text-center lg:min-h-[700px] lg:items-start lg:text-left">
          <p className="para-xs font-semibold uppercase text-primary md:para-lg">
            Stanley Garage Door Specialist
          </p>
          <h1 className="mt-3 heading-3 md:heading max-w-200 xl:max-w-233 xl:text-[3.5rem]">
            Garage door service built on generations of experience
          </h1>
          <p className="mt-6 mb-8 max-w-120 para-sm md:para-lg">
            Family-owned garage door repair, installation and spring services
            proudly serving <strong>Tampa Bay and Pinellas County</strong>.
          </p>
          <Button size={"lg"} className="gap-2" href="/contact">
            <PhoneTransferIcon weight="fill" />
            Contact us
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="page-container grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3 md:pt-16 lg:gap-12 xl:py-24">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </section>

      <hr className="text-neutral-200" />

      {/* About */}
      <section className="bg-background">
        <div className="page-container section-padding lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 xl:gap-20">
          <div className="mx-auto w-full overflow-hidden rounded-2xl bg-primary md:w-80 lg:mx-0 lg:w-96 xl:w-md">
            <Image
              src={"/ryan-kirk.png"}
              alt="Ryan and Kirk Stanley"
              width={326}
              height={300}
              sizes="(min-width: 1280px) 448px, (min-width: 1024px) 384px, (min-width: 768px) 320px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="pt-8 md:px-16 lg:px-0 lg:pt-0">
            <h2 className="heading-3 xl:heading-2">
              Keeping the family tradition going
            </h2>
            <p className="para-md py-6 lg:max-w-xl xl:para-lg xl:py-8">
              Garage doors have been the Stanley family business for
              generations. Today, Ryan is carrying it forward, serving
              homeowners throughout Tampa Bay with the experience that comes
              from growing up in the trade.
            </p>
            <Button href="/about" size={"lg"} variant={"secondary"}>
              Learn more about us
            </Button>
          </div>
        </div>
      </section>

      <hr className="text-neutral-200" />

      {/* Why us */}
      <section className="page-container section-padding">
        <h2 className="heading-3 mb-6 lg:mb-10 xl:mb-14 xl:heading-2">
          Why choose us?
        </h2>
        <div className="md:px-16 lg:grid lg:grid-cols-3 lg:gap-12 lg:px-0 xl:gap-16">
          {reasons.map(({ icon, title, description }) => (
            <div key={title} className="flex items-start gap-4 py-4">
              {icon}
              <div>
                <h3 className="para-md font-bold uppercase xl:para-lg xl:font-bold">
                  {title}
                </h3>
                <p className="mt-1 para-sm xl:mt-2 xl:para-md">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="text-neutral-200" />

      {/* Recent work */}
      <RecentWork />

      <hr className="text-neutral-200" />

      {/* Brands we trust */}
      <section className="section-padding mx-auto flex w-full max-w-6xl flex-col items-center px-6">
        <h2 className="text-sm leading-tight font-bold uppercase md:text-[1.375rem] lg:text-[1.875rem] xl:text-[2.375rem]">
          Brands we trust
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 py-8 xl:pt-12">
          {brands.map(({ key, logo, alt, link }) => (
            <Link
              key={key}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={logo}
                alt={alt}
                width={184}
                height={82}
                className="h-auto w-[92px] md:w-32 lg:w-40 xl:w-46"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CallToAction />
    </div>
  );
}
