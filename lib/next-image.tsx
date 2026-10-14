import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
}

export function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  loading,
  decoding = 'async',
  className = '',
  style = {},
  ...props
}: ImageProps) {
  const computedLoading = priority ? 'eager' : (loading || 'lazy');
  const computedStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'cover',
        ...style,
      }
    : style;

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={computedLoading}
      decoding={decoding}
      style={computedStyle}
      className={className}
      {...(priority ? { fetchPriority: 'high' } : {})}
      {...props}
    />
  );
}

export default Image;
