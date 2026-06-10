import { useState } from "react";
import { Smartphone, Mail, PhoneCall, Globe } from "lucide-react";

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
  onOpenSimulator: () => void;
}

export default function Footer({ onScrollTo, onOpenSimulator }: FooterProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-150 pt-16 pb-12 text-left font-sans text-sm text-[#484551]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div 
              onClick={() => onScrollTo("hero")}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="w-8 h-8 transition-transform group-hover:scale-105 flex items-center justify-center">
                {!logoError ? (
                  <img
                    src="/logo.png"
                    alt="Fast Pay Logo"
                    className="w-8 h-8 object-contain rounded-lg"
                    onError={() => setLogoError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 select-none text-[#772cfc]">
                    <path
                      d="M20,30 C35,18 75,15 85,10 C80,25 65,45 35,48 C25,49 18,40 20,30 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10,65 C25,53 65,50 75,45 C70,60 55,80 25,83 C15,84 8,75 10,65 Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
              <span className="text-xl font-black tracking-tight text-[#2a1366]">
                fast<span className="text-[#772cfc]">pay</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs text-[#484551] font-medium">
              Transformando el acceso al crédito en Honduras. Dividimos tus compras de forma ágil, segura y 100% digital, promoviendo la inclusión e inteligencia financiera.
            </p>
          </div>

          {/* Directory Links Col */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1 - Privacidad */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2a1366] tracking-wide uppercase">Privacidad</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#privacy" className="hover:text-[#772cfc] transition-colors font-semibold">Política de Privacidad</a></li>
                <li><a href="#cookies" className="hover:text-[#772cfc] transition-colors font-semibold">Uso de Cookies</a></li>
              </ul>
            </div>

            {/* Column 2 - Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2a1366] tracking-wide uppercase">Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#terms" className="hover:text-[#772cfc] transition-colors font-semibold">Términos de Servicio</a></li>
                <li><a href="#rules" className="hover:text-[#772cfc] transition-colors font-semibold">Cláusulas del Contrato</a></li>
              </ul>
            </div>

            {/* Column 3 - Ayuda */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2a1366] tracking-wide uppercase">Soporte</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#support" className="hover:text-[#772cfc] transition-colors font-semibold">Contacto</a></li>
                <li><a href="#faq" className="hover:text-[#772cfc] transition-colors font-semibold">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            {/* Column 4 - Compañía */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2a1366] tracking-wide uppercase">Compañía</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#about" className="hover:text-[#772cfc] transition-colors font-semibold">Nosotros</a></li>
                <li><a href="#press" className="hover:text-[#772cfc] transition-colors font-semibold">Fast Pay Global</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Separator line */}
        <div className="border-t border-gray-150 pt-8.5 mt-8.5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-[#484551]">
          <p>© 2026 Fast Pay. Tegucigalpa, Honduras. Todos los derechos reservados. Con el apoyo tecnológico de Freekee Labs.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-[#772cfc]" /> Español (Honduras)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
