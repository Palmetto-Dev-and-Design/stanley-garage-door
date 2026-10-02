import Image from "next/image";

const Services = () => {
  return (
    <>
      <section className="page-container section-padding">
        <h1>Garage door services</h1>
        <p>
          Reliable repairs, honest recommendations and 60+ years in the
          business.
        </p>
        <Image
          src={"/service-hero.png"}
          alt="A frontal view of a garage door"
          width={350}
          height={270}
        />
      </section>
      <section></section>
    </>
  );
};

export default Services;
