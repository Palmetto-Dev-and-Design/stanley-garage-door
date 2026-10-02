import {
  CalendarCheckIcon,
  CheckIcon,
  DeviceMobileIcon,
  PhoneIcon,
  SirenIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import PhoneQR from "@/components/PhoneQR";
import { cn } from "@/lib/utils";

const features = [
  {
    Icon: CheckIcon,
    weight: "bold",
    label: "Free Estimates",
    iconClass: "text-primary",
  },
  {
    Icon: CalendarCheckIcon,
    weight: "fill",
    label: "Same-day Service",
    iconClass: "text-primary",
  },
  {
    Icon: SirenIcon,
    weight: "fill",
    label: "Emergency Service",
    iconClass: "text-secondary",
  },
] as const;

const phones = [
  {
    label: "Cell phone / Emergencies",
    note: "Call or text",
    Icon: DeviceMobileIcon,
    number: "(727) 320-5799",
    href: "tel:+17273205799",
  },
  {
    label: "Office",
    note: null,
    Icon: PhoneIcon,
    number: "(727) 526-0812",
    href: "tel:+17275260812",
  },
];

const Contact = () => {
  return (
    <section className="lg:grid lg:grid-cols-2">
      {/* Intro: aligned with the page container on desktop */}
      <div className="page-container section-padding flex flex-col items-center lg:mx-0 lg:w-auto lg:max-w-none lg:items-start lg:justify-center lg:pr-12 lg:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
        <h1 className="heading-3 text-primary md:heading xl:text-[3.5rem]">
          Contact us
        </h1>
        <ul className="mt-8 grid w-full max-w-md grid-cols-3 gap-4 lg:mt-10 lg:max-w-none lg:grid-cols-1 lg:gap-8 lg:pl-4">
          {features.map(({ Icon, weight, label, iconClass }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-3 text-center lg:flex-row lg:gap-4 lg:text-left"
            >
              <Icon
                size={28}
                weight={weight}
                className={cn("shrink-0", iconClass)}
              />
              <span className="para-sm font-bold uppercase text-foreground lg:para-md lg:font-semibold lg:normal-case">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phone numbers */}
      <div className="section-padding flex justify-center bg-primary px-5 text-white lg:items-center lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6 lg:gap-8">
            {phones.map(({ label, note, Icon, number, href }) => (
              <div key={href}>
                <p className="para-sm font-semibold uppercase">{label}</p>
                {note && <p className="para-xs">{note}</p>}
                <Link
                  href={href}
                  className="mt-2 flex items-center gap-2 heading-4 font-bold xl:text-2xl"
                >
                  <Icon
                    size={24}
                    weight="fill"
                    className="text-tertiary-hover"
                  />
                  {number}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="para-sm font-semibold uppercase">…or scan QR code:</p>
            <div className="w-full rounded-xl bg-white p-3 lg:w-48 xl:w-56">
              <PhoneQR />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
