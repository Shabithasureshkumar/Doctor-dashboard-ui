import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'outline-purple';
  size?: 'xs' | 'sm';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'xs',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    purple: 'bg-purple-100/80 text-[#5C24FF] border border-purple-200/50',
    green: 'bg-emerald-50 text-emerald-600 border border-emerald-200/50',
    amber: 'bg-amber-50 text-amber-600 border border-amber-200/50',
    red: 'bg-rose-50 text-rose-600 border border-rose-200/50',
    blue: 'bg-blue-50 text-blue-600 border border-blue-200/50',
    gray: 'bg-slate-100 text-slate-600 border border-slate-200/60',
    'outline-purple': 'bg-white text-[#5C24FF] border border-purple-200',
  };

  const dotStyles = {
    purple: 'bg-[#5C24FF]',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
    blue: 'bg-blue-500',
    gray: 'bg-slate-400',
    'outline-purple': 'bg-[#5C24FF]',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium tracking-tight whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};
