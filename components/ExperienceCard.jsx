import MagicBento from "./MagicBento";

export default function ExperienceCard({ item }) {
  return (
    <MagicBento
      className="group h-full"
      textAutoHide={true}
      enableStars={false}
      enableSpotlight
      enableBorderGlow={true}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect
      spotlightRadius={400}
      particleCount={12}
      glowColor="14, 165, 233"
      disableAnimations={false}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300">
            {item.categoryLabel}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{item.role}</h3>
          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{item.organization}</p>
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-slate-800 dark:text-sky-300">
          {item.period}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>

      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {item.responsibilities.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>

      <p className="mt-4 rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-700 dark:bg-slate-800/80 dark:text-sky-300">
        <span className="font-semibold">Outcome:</span> {item.impact}
      </p>
    </MagicBento>
  );
}