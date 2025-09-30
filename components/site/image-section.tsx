import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  title: string;
  body: string;
  reverse?: boolean;
};
export function ImageSection({ src, alt, title, body, reverse }: Props) {
  return (
    <section className="mt-10">
      <div
        className={`bg-card/80 backdrop-blur-sm border rounded-2xl p-4 md:p-6 grid gap-6 md:grid-cols-2 items-center ${
          reverse ? "md:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div>
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={900}
            height={520}
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-semibold text-pretty">
            {title}
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-pretty opacity-90">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
