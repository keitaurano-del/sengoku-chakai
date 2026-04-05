export function SectionHeading({
  label,
  heading,
  description,
  light = false,
}: {
  label?: string;
  heading: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12 text-center">
      {label && (
        <span className="mb-3 block text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {label}
        </span>
      )}
      <h2
        className={`font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl lg:text-5xl ${
          light ? "text-charcoal" : "text-cream"
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-lg ${
            light ? "text-charcoal/70" : "text-cream/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
