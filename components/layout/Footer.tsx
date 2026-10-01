import {
  DeviceMobileIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  RedditLogoIcon,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const socials = [
    {
      logo: <EnvelopeSimpleIcon size={28} />,
      link: "mailto:ryanstanley111@gmail.com",
      label: "Email",
    },
    {
      logo: <PhoneIcon size={28} />,
      link: "tel:+17273205799",
      label: "Phone",
    },
    {
      logo: <RedditLogoIcon size={28} />,
      link: "https://www.reddit.com/user/Garage-Door-guy/",
      label: "Reddit",
      external: true,
    },
  ];

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Services",
      link: "/services",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Gallery",
      link: "/gallery",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  const startYear = 1960;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full shadow-[0_-2px_2px_-2px_rgba(0,0,0,0.4)] px-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col items-center py-12 gap-6">
          <Image
            src={"/footer-logo.png"}
            alt="logo with the words Stanley Garage Door Specialist"
            width={350}
            height={67}
          />
          <ul className="flex gap-4">
            {socials.map(({ logo, link, label, external }) => (
              <li key={link}>
                <Link
                  href={link}
                  className="hover:text-primary"
                  aria-label={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {logo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <DeviceMobileIcon size={32} />
            <div>
              <p>
                <span className="uppercase para-sm font-semibold">
                  Cell phone -{" "}
                </span>
                <span className="para-xs">Call or text</span>
              </p>
              <Link
                href={"tel:+17273205799"}
                className="text-primary font-bold para-lg"
              >
                (727) 320-5799
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon size={32} />
            <div>
              <p className="uppercase para-sm font-semibold">Office</p>
              <Link
                href={"tel:+17275260812"}
                className="text-primary font-bold para-lg"
              >
                (727) 526-0812
              </Link>
            </div>
          </div>
        </div>
        <hr className="text-neutral-200 md:hidden" />
        <div className="py-8 md:px-24">
          <ul className="flex flex-col items-center para-lg gap-4">
            <li className="hidden md:flex uppercase font-semibold">Sitemap</li>
            {links.map(({ title, link }) => (
              <li key={title}>
                <Link href={link} className="hover:text-primary font-medium">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="text-neutral-200" />
      <div className="py-4 text-center md:text-left text-neutral-400">
        <p className="para-xs">
          &copy;
          {startYear === currentYear
            ? startYear
            : `${startYear}-${currentYear}`}{" "}
          Stanley Garage Door Specialist, LLC. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
