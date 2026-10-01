import Button from "@/components/primitives/Button";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/constants";
import { PhoneTransferIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">      
        <div className="pointer-events-none absolute inset-0 opacity-20 lg:left-auto lg:right-[5%] lg:w-[48%] lg:translate-y-24 lg:opacity-100 xl:right-[8%]">
          <Image src={'/home-hero.png'} alt="" fill className="object-contain object-center lg:object-right-bottom" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center lg:min-h-[700px] lg:items-start lg:text-left">
          <p className="para-xs font-semibold uppercase text-primary md:para-lg">Stanley Garage Door Specialist</p>
          <h1 className="mt-3 heading-3 md:heading max-w-200">Garage door service built on generations of experience</h1>
          <p className="my-6 max-w-120 para-sm md:para-lg">Family-owned garage door repair, installation and spring service
          proudly serving <strong>Tampa Bay and Pinellas County</strong>.</p>
          <Button size={'lg'} className="gap-2"><PhoneTransferIcon weight="fill" />Contact us</Button>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:gap-12 px-4 sm:grid-cols-3 sm:gap-3 md:py-16 lg:py-20">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </section>
    </>
  );
}
