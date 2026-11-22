import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'lime' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', loading, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center gap-2 font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider border cursor-pointer';
    const variants: Record<string, string> = {
      primary: 'bg-[#202420] border-[#2A2E2A] text-[#F1F0E8] hover:border-[#C6FF54]/50 hover:text-[#C6FF54]',
      secondary: 'bg-transparent border-[#2A2E2A] text-[#969B92] hover:border-[#F1F0E8] hover:text-[#F1F0E8]',
      ghost: 'bg-transparent border-transparent text-[#969B92] hover:text-[#F1F0E8] hover:bg-[#202420]',
      danger: 'bg-transparent border-[#FF5E5E]/40 text-[#FF5E5E] hover:bg-[#FF5E5E]/10',
      lime: 'bg-[#C6FF54] border-[#C6FF54] text-[#101210] hover:bg-[#B8F040] font-semibold',
      outline: 'bg-transparent border-[#C6FF54]/30 text-[#C6FF54] hover:bg-[#C6FF54]/10',
    };
    const sizes: Record<string, string> = {
      xs: 'px-2 py-1 text-[9px]',
      sm: 'px-3 py-1.5 text-[10px]',
      md: 'px-4 py-2 text-xs',
      lg: 'px-6 py-3 text-sm',
    };
    return (
      <motion.button
        ref={ref as any}
        whileTap={{ scale: 0.97 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && (
          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
