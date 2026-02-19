import React from 'react';
import logoImage from '/images/e1c2bed9ab4c849509b3bab10ce49db79e8c354a.png';

interface FirstsLogoProps {
  className?: string;
}

export function FirstsLogo({ className = "w-12 h-12" }: FirstsLogoProps) {
  return (
    <img
      src={logoImage.src}
      alt="Логотип ВДОСТУПЕ"
      className={`object-contain ${className}`}
    />
  );
}
