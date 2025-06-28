import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaHeadset, FaShieldAlt, FaRocket } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const phoneNumber = '+51977548397';
  const defaultMessage = 'Hola!, Tienes alguna pregunta?, hazmela saber!';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const faqs = [
    {
      question: "¿Cómo comprar en eltiocoins?",
      answer: "Inicia sesión o regístrate en Eltiocoins. Selecciona tu producto y haz clic en (Comprar ahora). Confirma en la página de pago, elige tu método y presiona (Pago Seguro). Revisa los detalles en (Orden de Compra).",
      icon: FaRocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      question: "¿Por qué elegir eltiocoins?",
      answer: "Entrega como maximo en 1h si los datos son correctos. Seguridad garantizada para tu cuenta. Reembolso total en 24 horas si ocurre algún error. Tenemos Streamers de que avalan nuestro servicio.",
      icon: FaShieldAlt,
      color: "from-green-500 to-emerald-500"
    },
    {
      question: "¿Es eltiocoins legítimo?",
      answer: "eltiocoins comenzó en 2020 y lleva más de 4 años ofreciendo servicios de juego a jugadores de todo el mundo. La seguridad siempre es nuestra prioridad, realizamos entregas rápidas y garantizamos la seguridad de su cuenta al mismo tiempo.",
      icon: FaShieldAlt,
      color: "from-yellow-500 to-orange-500"
    },
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer: "Aceptamos PayPal como método principal, así como tarjetas de crédito y débito vinculadas a PayPal. Esto garantiza una experiencia de pago segura, rápida y sin complicaciones.",
      icon: FaShieldAlt,
      color: "from-purple-500 to-pink-500"
    },
    {
      question: "¿Puedo comprar monedas en diferentes plataformas (PS, Xbox, PC)?",
      answer: "Sí, en Eltiocoins puedes comprar monedas para PlayStation, Xbox y PC sin problemas. Solo asegúrate de seleccionar la plataforma correcta al momento de hacer tu pedido para garantizar una entrega rápida y sin inconvenientes.",
      icon: FaRocket,
      color: "from-indigo-500 to-purple-500"
    },
    {
      question: "¿Qué hago si tengo un problema con mi compra?",
      answer: "Si tienes algún inconveniente con tu compra, no te preocupes. Contamos con canales de atención por WhatsApp y una comunidad abierta en WhatsApp, donde nuestro equipo estará listo para ayudarte y resolver cualquier duda o problema que tengas.",
      icon: FaHeadset,
      color: "from-red-500 to-pink-500"
    },
  ];

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 to-black opacity-50"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div 
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl">
              <FaQuestionCircle className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Preguntas{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-8">
            ¿Tienes otra pregunta y no encuentras la respuesta que buscas?
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                className="group relative"
              >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${faq.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 rounded-2xl`}></div>
                
                {/* FAQ Card */}
                <div className={`relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/20 group-hover:border-zinc-600 overflow-hidden ${isOpen ? 'ring-2 ring-green-500/50' : ''}`}>
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between group-hover:bg-zinc-800/50 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${faq.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white text-lg" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      {isOpen ? (
                        <FaChevronUp className="text-zinc-400 text-lg" />
                      ) : (
                        <FaChevronDown className="text-zinc-400 text-lg" />
                      )}
                    </div>
                  </button>

                  {/* Answer Content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0">
                      <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-4"></div>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <FaHeadset className="text-xl" />
            <span>¿Necesitas más ayuda?</span>
          </a>
        </div>
      </div>
    </section>
  );
};

