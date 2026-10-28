import { ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import img1 from "../assets/img1.avif";
import img2 from "../assets/img2.avif";
import img3 from "../assets/img3.avif";

export default function Features() {
  const cards = [
    {
      id: "feature-1",
      image: img1,
      title: "Obtén todo lo que necesitas ya.",
      description: "Todo lo que buscas, donde sea que estés, en línea o en tienda física de forma instantánea."
    },
    {
      id: "feature-2",
      image: img2,
      title: "Paga en cuotas",
      description: "Paga en 2 a 8 cuotas sin intereses o elige un plan mensual que se ajuste a tu presupuesto real."
    },
    {
      id: "feature-3",
      image: img3,
      title: "Paga a tiempo y evita recargos.",
      description: "Estamos aquí para ayudarte. Te notificaremos sobre tus próximos pagos por WhatsApp o SMS para evitar cargos."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white border-t border-[#F5F5F7]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-2xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#772cfc] flex items-center gap-1.5 justify-center md:justify-start uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Finanzas Inteligentes
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#2a1366] tracking-tight mt-2 leading-tight">
            Controla tus gastos con Fast Pay
          </h2>
          <div className="w-16 h-1.5 bg-[#772cfc] rounded-full mt-4" />
        </div>

        {/* Triple Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" id="brand-benefit-grid">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col text-left group"
              id={`feature-card-${card.id}`}
            >
              {/* Image Container with high rounded corners */}
              <div className="aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-[#F5F5F7] mb-6 relative shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge highlight for Card 3 or Card 2 to add interactive value */}
                {card.id === "feature-2" && (
                  <div className="absolute top-4 left-4 bg-[#772cfc] text-white text-[10px] uppercase font-extrabold tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                    <ShieldCheck className="w-3.5 h-3.5" /> 0% Interés
                  </div>
                )}
                {card.id === "feature-3" && (
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] uppercase font-extrabold tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1 shadow">
                    <AlertCircle className="w-3.5 h-3.5" /> SMS & Whatsapp
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-extrabold text-[#2a1366] mb-3 group-hover:text-[#772cfc] transition-colors leading-snug">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[#484551] text-sm md:text-base leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
