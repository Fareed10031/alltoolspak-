import React from 'react';
import BlackFooter from './BlackFooter';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
}

export function Footer(_props: FooterProps = {}) {
  return <BlackFooter />;
}

export default Footer;
