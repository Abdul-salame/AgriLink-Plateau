const VARIANTS = {
  primary: 'bg-navy-600 text-cream hover:bg-navy-700 active:bg-navy-800',
  accent:  'bg-gold-400 text-navy-900 hover:bg-gold-500 active:bg-gold-600',
  outline: 'bg-transparent text-navy-600 border border-navy-500 hover:bg-navy-50 dark:text-navy-200 dark:border-navy-400 dark:hover:bg-navy-800',
  ghost:   'bg-transparent text-ink hover:bg-navy-50 dark:text-navy-100 dark:hover:bg-navy-800',
}
const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-[15px]',
  lg: 'px-7 py-4 text-base',
}
export default function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
