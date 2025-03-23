import React from "react";

export const Questions = () => {

  const phoneNumber = '+51977548397'; // Reemplaza con tu número de WhatsApp
  const defaultMessage = 'Hola!, Tienes alguna pregunta?, hazmela saber!'; // Mensaje predeterminado

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const faqs = [
    {
      question: "¿Cómo comprar en eltiocoins?",
      answer: "Inicia sesión o regístrate en Eltiocoins. Selecciona tu producto y haz clic en (Comprar ahora). Confirma en la página de pago, elige tu método y presiona (Pago Seguro). Revisa los detalles en (Orden de Compra).",
    },
    {
      question: "¿Por qué elegir eltiocoins",
      answer: "Entrega como maximo en 1h si los datos son correctos. Seguridad garantizada para tu cuenta. Reembolso total en 24 horas si ocurre algún error. Tenemos Streamers de que avalan nuestro servicio."
    },
    {
      question: "¿Es eltiocoins legítimo? ",
      answer:
        "eltiocoins comenzó en 2020 y lleva más de 4 años ofreciendo servicios de juego a jugadores de todo el mundo. La seguridad siempre es nuestra prioridad, realizamos entregas rápidas y garantizamos la seguridad de su cuenta al mismo tiempo.",
    },
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer:
        "Aceptamos PayPal como método principal, así como tarjetas de crédito y débito vinculadas a PayPal. Esto garantiza una experiencia de pago segura, rápida y sin complicaciones.",
    },
    {
      question: "¿Puedo comprar monedas en diferentes plataformas (PS, Xbox, PC)?",
      answer:
        "Sí, en Eltiocoins puedes comprar monedas para PlayStation, Xbox y PC sin problemas. Solo asegúrate de seleccionar la plataforma correcta al momento de hacer tu pedido para garantizar una entrega rápida y sin inconvenientes.",
    },
    {
      question: "¿Qué hago si tengo un problema con mi compra?",
      answer:
        "Si tienes algún inconveniente con tu compra, no te preocupes. Contamos con canales de atención por WhatsApp y una comunidad abierta en WhatsApp, donde nuestro equipo estará listo para ayudarte y resolver cualquier duda o problema que tengas.",
    },
  ];

  return (
    <div  style={styles.container}>
      <h2 data-aos="zoom-in-left" style={styles.title}>Preguntas frecuentes</h2>
      <p data-aos="zoom-in-left" style={styles.description}>
      ¿Tienes otra pregunta y no encuentras la respuesta que buscas?
      Ponte en contacto con nuestro equipo de soporte{" "}
        <a  href={whatsappUrl}  style={styles.link}         rel="noopener noreferrer"         target="_blank"

        >
          envianos un mensaje
        </a>{" "}
         y nos pondremos en contacto con usted lo antes posible.
      </p>
      <div data-aos="fade-up"
        data-aos-anchor-placement="center-bottom" style={styles.grid}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.question}>{faq.question}</h3>
            <p style={styles.answer}>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos en un objeto para inline styling
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    marginTop: "70px",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    lineHeight: "1",
    fontWeight: "600",
    textAlign: "center",
    color: "white",
    marginBottom: "3rem",
  },
  description: {
    fontSize: "1rem",
    color: "white",
    marginBottom: "30px",
  },
  link: {
    color: "#70F468",
    textDecoration: "none",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#323232",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "left",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  question: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  answer: {
    fontSize: "1rem",
    color: "gray-900 ",
  },
};

