import { useState } from "react";
import { Smartphone, Mail, PhoneCall, Globe } from "lucide-react";
import logo from "../assets/logo.png";

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
  onOpenSimulator: () => void;
}

export default function Footer({ onScrollTo, onOpenSimulator }: FooterProps) {
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
                <img
                  src={logo}
                  alt="Fast Pay Logo"
                  className="w-8 h-8 object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
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
                <li><a href="/legal/FastPay_Politica_Privacidad.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#772cfc] transition-colors font-semibold">Política de Privacidad</a></li>
                <li><a href="/legal/FastPay_Politica_Cookies.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#772cfc] transition-colors font-semibold">Uso de Cookies</a></li>
              </ul>
            </div>

            {/* Column 2 - Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2a1366] tracking-wide uppercase">Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="/legal/FastPay_Terminos_Servicio.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#772cfc] transition-colors font-semibold">Términos de Servicio</a></li>
                <li><a href="/legal/FastPay_Contrato_Usuario.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#772cfc] transition-colors font-semibold">Contrato de Usuario</a></li>
                <li><a href="/legal/FastPay_Contrato_Comercio.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#772cfc] transition-colors font-semibold">Contrato de Comercio</a></li>
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
              </ul>
            </div>

          </div>

        </div>

        {/* Separator line */}
        <div className="border-t border-gray-150 pt-8.5 mt-8.5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-[#484551]">
          <p>© 2026 Fast Pay. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-[#772cfc]" /> Español (Honduras)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
