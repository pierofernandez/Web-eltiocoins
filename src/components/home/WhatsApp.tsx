import React from 'react';

export const WhatsApp: React.FC = () => {
  // Número de teléfono y mensaje predeterminado
  const phoneNumber = '+51977548397'; // Reemplaza con tu número de WhatsApp
  const defaultMessage = 'Hola, envíame tu captura de pago o preguntame si tienes alguna duda!.'; // Mensaje predeterminado

  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div style={styles.container}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        <img
          src="/img/WhatsApp.svg.png" 
          alt="WhatsApp"
          style={styles.icon}
        />
      </a>
    </div>
  );
};

// Estilos con tipos explícitos
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed', // Tipo específico para 'position'
    bottom: '20px',
    right: '20px',
    zIndex: 1000, // Asegura que esté por encima de otros elementos
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    backgroundColor: '#25D366', // Color de WhatsApp
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

export default WhatsApp;