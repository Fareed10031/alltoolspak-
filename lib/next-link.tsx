import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  prefetch?: boolean;
}

export function Link({ href, children, onClick, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (e.defaultPrevented) return;

    // Handle hash links on same page (e.g., /#tools or #tools)
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hash = href.includes('#') ? href.split('#')[1] : '';
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
      if (currentPath === '/' || !href.startsWith('/#')) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState({}, '', href.startsWith('/') ? href : `#${hash}`);
        return;
      }
    }

    // Client-side routing for Vite SPA
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default Link;
