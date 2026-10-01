import Image from "next/image";

type ServiceCardProps = {
    title: string;
    image: string;
    alt: string;
    panelClass: string;
    textClass: string;
};

const ServiceCard = ({ title, image, alt, panelClass, textClass }: ServiceCardProps) => {
    return (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-md sm:aspect-[7/6]">
            <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
            />

            <div
                className={`absolute inset-x-0 bottom-0 h-[48%] [clip-path:polygon(0_0,100%_80%,100%_100%,0_100%)] sm:[clip-path:polygon(0_0,100%_85%,100%_100%,0_100%)] ${panelClass}`}
            >
                <h3
                className={`absolute bottom-4 left-6 para-xs lg:para-md font-bold lg:font-bold uppercase ${textClass}`}
                >
                {title}
                </h3>
            </div>
        </div>
    )
}



export default ServiceCard;