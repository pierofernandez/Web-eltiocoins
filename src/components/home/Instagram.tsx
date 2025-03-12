import React from 'react';

export const Instagram: React.FC = () => {
  const instagramUrl = 'https://www.instagram.com/direct/t/17842364825821576/'; // Reemplaza con tu usuario de Instagram

  return (
    <div style={styles.container}>
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={styles.button}>
        <img
          src='/img/Instagram.svg.png'
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
    bottom: '90px', // Ajusta la posición para que esté encima del botón de WhatsApp
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
