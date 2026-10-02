import MapClient from "@/components/MapClient";

export default function ServiceArea() {
  return (
    <section className="flex flex-col gap-8 bg-background pb-16 shadow-section lg:grid lg:grid-cols-2 lg:gap-0 lg:pb-0">
      <MapClient className="h-64 bg-neutral-200 lg:aspect-[778/502] lg:h-auto" />
      <div className="flex flex-col justify-center gap-6 px-8 text-foreground lg:p-16 xl:p-24">
        <h2 className="heading-3 xl:heading-2">Local to South Pinellas</h2>
        <p className="para-md xl:para-lg">
          We live and work in the{" "}
          <strong className="font-semibold">South Pinellas County</strong> area.
          <br />
          Staying local means we can respond quickly when you need us, including
          same-day and emergency service.
        </p>
      </div>
    </section>
  );
}
