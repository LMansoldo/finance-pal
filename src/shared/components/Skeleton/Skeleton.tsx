import React from 'react';
import { SkeletonProps } from '@shared/types/Skeleton.type';

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.25rem',
  className = '',
}) => {
  const styleWidth = typeof width === 'number' ? `${width}px` : width;
  const styleHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`bg-secondary-500 animate-pulse ${className}`}
      style={{
        width: styleWidth,
        height: styleHeight,
        borderRadius: borderRadius,
      }}
    />
  );
};
