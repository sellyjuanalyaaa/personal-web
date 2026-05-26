export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      suppressHydrationWarning
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 ${
        isActive
          ? "bg-sky-600 text-white shadow-sm dark:bg-sky-500 dark:text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      }`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}