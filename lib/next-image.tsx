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
  mobileWebpSrc?: string;
  mobileSrc?: string;
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
  mobileWebpSrc,
  mobileSrc,
  ...props
}: ImageProps) {
  const computedLoading = loading || 'lazy';
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

  const imgElement = (
    <img
      src={src}
      alt={alt && alt.trim().length > 0 ? alt : 'AllToolsPK utility preview'}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={computedLoading}
      decoding={decoding}
      style={computedStyle}
      className={className}
      {...(priority && !loading ? { fetchPriority: 'high' } : {})}
      {...props}
    />
  );

  if (mobileWebpSrc || mobileSrc) {
    return (
      <picture className={fill ? 'block w-full h-full' : 'contents'}>
        {mobileWebpSrc && (
          <source media="(max-width: 767px)" srcSet={mobileWebpSrc} type="image/webp" />
        )}
        {mobileSrc && (
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
        )}
        {imgElement}
      </picture>
    );
  }

  return imgElement;
}

export default Image;

