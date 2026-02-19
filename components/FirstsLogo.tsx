import React from 'react';

interface FirstsLogoProps {
  className?: string;
}

export function FirstsLogo({ className = "w-12 h-12" }: FirstsLogoProps) {
  return (
    <img
      src="https://raw.githubusercontent.com/admin1350/PetroStudying/main/e1c2bed9ab4c849509b3bab10ce49db79e8c354a.png"
      alt="Логотип ВДОСТУПЕ"
      className={`object-contain ${className}`}
    />
  );
}
