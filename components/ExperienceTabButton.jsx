export default function ExperienceTabButton({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-sky-600 text-white shadow-sm"
          : "bg-sky-100 text-sky-700 hover:scale-[1.02] hover:bg-sky-200"
      }`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}