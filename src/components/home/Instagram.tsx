import React from 'react';
import { useGlobalStore } from '../../store/global.store';

export const Instagram: React.FC = () => {
  const instagramUrl = 'https://www.instagram.com/direct/t/17842364825821576/'; // Reemplaza con tu usuario de Instagram

  // Ocultar cuando el carrito está abierto para no tapar el precio
  const isSheetOpen = useGlobalStore(state => state.isSheetOpen);
  const sheetContent = useGlobalStore(state => state.sheetContent);
  if (isSheetOpen && sheetContent === 'cart') return null;

  return (
    <div style={styles.container}>
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={styles.button}>
        <img loading="lazy" src='/img/Instagram.svg.webp'
          alt="Instagram"
          style={styles.icon}
        />
      </a>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    bottom: '150px', // Subido más para no chocar con NavigationButton
    right: '20px',
    zIndex: 1000,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
};

export default Instagram;
