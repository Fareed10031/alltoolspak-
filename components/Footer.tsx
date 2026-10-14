import React from 'react';
import BlackFooter from './BlackFooter';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  onSelectTool?: (toolId: string) => void;
}

export function Footer({ onNavigate, onSelectTool }: FooterProps = {}) {
  return <BlackFooter onNavigate={onNavigate} onSelectTool={onSelectTool} />;
}

export default Footer;
