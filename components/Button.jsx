export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-slate-900 text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
    secondary:
      "border border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-700",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
  };

  const classes = `inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} suppressHydrationWarning {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} suppressHydrationWarning {...props}>
      {children}
    </button>
  );
}