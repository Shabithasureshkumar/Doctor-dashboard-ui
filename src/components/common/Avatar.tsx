import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  statusIndicator?: 'online' | 'waiting' | 'busy' | 'offline';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials = 'PT',
  size = 'md',
  statusIndicator,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
    xl: 'w-14 h-14 text-base',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-white',
    waiting: 'bg-amber-500 ring-white',
    busy: 'bg-rose-500 ring-white',
    offline: 'bg-slate-300 ring-white',
  };

  return (
    <div className={`relative inline-block flex-shrink-0 ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className={`${sizeClasses[size]} rounded-full object-cover shadow-sm ring-1 ring-slate-100`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-semibold flex items-center justify-center shadow-sm`}
        >
          {initials}
        </div>
      )}

      {statusIndicator && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ${statusColors[statusIndicator]}`}
        />
      )}
    </div>
  );
};
