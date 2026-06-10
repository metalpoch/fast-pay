import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenSimulator: () => void;
  onScrollTo: (sectionId: string) => void;
}

export default function Hero({ onOpenSimulator, onScrollTo }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-white"
    >
      {/* Background Image of lady in supermarket with shopping cart matching Image 1 */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center select-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600')`,
        }}
        id="hero-bg-img"
      >
        {/* Soft elegant gradient overlays for peak text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent md:block hidden" />
        <div className="absolute inset-0 bg-white/90 md:hidden block" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full" id="hero-content-wrapper">
        <div className="max-w-xl md:max-w-2xl text-left">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#772cfc]/5 border border-[#772cfc]/10 rounded-full text-xs font-semibold text-[#772cfc] mb-6"
            id="hero-badge"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9d57fb]" />
            Primera aplicación de Buy Now, Pay Later en Honduras 🇭🇳
          </motion.div>

          {/* Slogans */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-[#2a1366] gap-2 leading-tight md:leading-[1.1]"
            id="hero-headline"
          >
            Haz swipe.<br />
            <span className="text-[#772cfc]">Haz pay.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 text-2xl md:text-3xl font-extrabold text-[#9d57fb] tracking-tight"
          >
            Tus compras, a tu ritmo.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-[#484551] text-base md:text-lg font-medium leading-relaxed max-w-lg"
            id="hero-description"
          >
            Divide tus compras favoritas desde Lps. 100 hasta Lps. 15,000 en cómodas cuotas semanales o quincenales, sin necesidad de tarjeta de crédito y con 0% de interés.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
            id="hero-ctas"
          >
            <button
              onClick={() => onScrollTo("calculator")}
              className="px-8 py-4 bg-[#2a1366] hover:bg-[#1a0c43] text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-[#2a1366]/15 flex items-center gap-2 group cursor-pointer"
              id="hero-btn-download"
            >
              Probar Simulador
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onScrollTo("shops")}
              className="px-8 py-4 bg-[#F5F5F7] hover:bg-[#eeeef0] text-[#2a1366] font-bold rounded-full transition-all duration-200 border border-[#eeeef0] flex items-center gap-2 cursor-pointer"
              id="hero-btn-stores"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Tiendas
            </button>
          </motion.div>

          {/* Micro Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-[#2a1366]/5 flex items-center gap-8 text-xs font-semibold text-[#484551]"
            id="hero-stats"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold text-[#2a1366]">0%</span>
              <span>Interés</span>
            </div>
            <div className="w-px h-8 bg-[#2a1366]/10" />
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold text-[#2a1366]">Sin Tarjeta</span>
              <span>Solo con tu DNI</span>
            </div>
            <div className="w-px h-8 bg-[#2a1366]/10" />
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold text-[#2a1366]">Cupo Rápido</span>
              <span>De 500 a 15,000 Lps.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
