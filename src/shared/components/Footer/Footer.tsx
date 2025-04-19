import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 border-t border-secondary-700 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-secondary-200 text-sm">
        &copy; {currentYear} Finance Pal. Todos os direitos reservados.
      </div>
    </footer>
  );
};