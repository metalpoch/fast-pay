import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface PartnerSectionProps {
  onJoinAsPartner: () => void;
}

export default function PartnerSection({ onJoinAsPartner }: PartnerSectionProps) {
  const perks = [
    "Incremento de hasta 30% en ticket promedio de compra",
    "Adquisición de nuevos clientes recurrentes en Honduras",
    "Tú cobras el 100% por adelantado; Fast Pay asume todo el riesgo moratorio"
  ];

  return (
    <section id="partners" className="py-24 bg-[#2a1366] text-white relative overflow-hidden text-left border-t border-gray-900/10">
      {/* Decorative gradient overlay */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#772cfc]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#9d57fb]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Copy block */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c396ff] flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Para Comercios & Marcas HN
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Vende más con Fast Pay
            </h2>
            <p className="text-[#eee3ff] text-sm md:text-base leading-relaxed max-w-xl">
              Únete a las marcas hondureñas que ya están aumentando sus transacciones ofreciendo la flexibilidad de pagar después (BNPL) sin comisiones ocultas para el comprador.
            </p>

            <div className="space-y-4 pt-2">
              {perks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[#eee3ff] text-xs md:text-sm font-semibold">{perk}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-between">
            <div className="space-y-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-[#c396ff]" />
              </div>
              <h3 className="text-xl font-bold text-white">¿Listo para expandir tu negocio?</h3>
              <p className="text-xs text-[#eee3ff] leading-relaxed">
                Nuestra API se integra en minutos en Shopify, WooCommerce o sistemas de facturación en tienda física mediante un código QR exclusivo.
              </p>
            </div>

            <button
              onClick={onJoinAsPartner}
              className="w-full py-4 bg-white hover:bg-[#F5F5F7] text-[#2a1366] font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group shadow-xl"
              id="cta-partner-btn"
            >
              Convertirme en Comercio Aliado
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
