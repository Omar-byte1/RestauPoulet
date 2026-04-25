import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button {...props} className={['btn', `btn-${variant}`, className].filter(Boolean).join(' ')} />
}

