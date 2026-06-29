export function FormInput({
  label,
  id,
  error,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[13.5px] font-medium text-(--text)">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full h-11 px-4 rounded-xl border text-[15px] bg-(--bg) text-(--text) placeholder:text-(--text-muted) outline-none transition-all
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/40'
            : 'border-(--border-mid) focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800'
          }`}
        {...props}
      />
      {error && <p className="text-[12.5px] text-red-500">{error}</p>}
      {hint && !error && <p className="text-[12.5px] text-(--text-muted)">{hint}</p>}
    </div>
  )
}

export function FormSelect({ label, id, error, children, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[13.5px] font-medium text-(--text)">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full h-11 px-4 rounded-xl border text-[15px] bg-(--bg) text-(--text) outline-none transition-all appearance-none cursor-pointer
          ${error
            ? 'border-red-400'
            : 'border-(--border-mid) focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800'
          }`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-[12.5px] text-red-500">{error}</p>}
    </div>
  )
}
