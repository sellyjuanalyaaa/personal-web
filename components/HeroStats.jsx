import SpotlightCard from "./SpotlightCard";

const stats = [
	{ label: "Projects", value: "06+" },
	{ label: "Focus", value: "Web & UI/UX" },
	{ label: "Based in", value: "Indonesia" },
];

export default function HeroStats() {
	return (
		<div className="grid gap-4 sm:grid-cols-3">
			{stats.map((item) => (
				<SpotlightCard
					key={item.label}
					className="rounded-2xl bg-white/75 p-5 backdrop-blur-sm shadow-xl shadow-sky-200/60 dark:bg-slate-900/70 dark:shadow-black/35"
					spotlightColor="rgba(14, 165, 233, 0.22)"
				>
					<p className="text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
					<p className="mt-2 text-sm text-slate-600 dark:text-neutral-300">{item.label}</p>
				</SpotlightCard>
			))}
		</div>
	);
}
