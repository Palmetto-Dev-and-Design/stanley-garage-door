import Image from "next/image";

const Services = () => {
  return (
    <>
      <section className="page-container section-padding flex flex-col items-center lg:flex-row">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="heading-3 md:heading xl:text-[3.5rem] text-primary">
            Garage door services
          </h1>
          <p className="my-6 max-w-120 para-sm md:para-lg text-center md:text-left">
            Reliable repairs, honest recommendations and 60+ years in the
            business.
          </p>
        </div>
        <Image
          src={"/service-hero.png"}
          alt="A frontal view of a garage door"
          width={350}
          height={218}
          className="h-auto lg:ml-auto lg:w-120 xl:w-136"
        />
      </section>
      <section></section>
    </>
  );
};

export default Services;
