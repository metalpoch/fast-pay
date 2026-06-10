import { ShoppingCart, Touchpad, CheckSquare } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <ShoppingCart className="w-8 h-8 text-[#772cfc]" />,
      title: "Elige tus productos",
      description: "Compra en tus tiendas favoritas en línea o en establecimientos físicos aliados de Honduras."
    },
    {
      num: "02",
      icon: <Touchpad className="w-8 h-8 text-[#772cfc]" />,
      title: "Selecciona Fast Pay",
      description: "Al pagar en caja o checkout digital, elige Fast Pay para dividir tu total de forma instantánea."
    },
    {
      num: "03",
      icon: <CheckSquare className="w-8 h-8 text-[#772cfc]" />,
      title: "Paga tu Enganche y Disfruta",
      description: "Paga tu primer enganche (10%, 20% o 30%) con tu tarjeta de débito y liquida el resto semanal o quincenalmente."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#2a1366]" id="how-it-works-title">
            Cómo funciona Fast Pay
          </h2>
          <div className="w-16 h-1.5 bg-[#772cfc] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative" id="how-it-works-grid">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-gray-150 shadow-xs relative group hover:shadow-sm transition-shadow duration-300"
              id={`step-card-${step.num}`}
            >
              {/* Massive background index number */}
              <div className="absolute top-4 right-6 text-6xl md:text-7xl font-black text-[#2a1366]/5 select-none font-sans leading-none">
                {step.num}
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-[#772cfc]/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Header */}
              <h3 className="text-xl font-extrabold text-[#2a1366] mb-3">
                {step.title}
              </h3>

              {/* Text */}
              <p className="text-[#484551] text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
