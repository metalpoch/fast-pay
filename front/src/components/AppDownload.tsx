import React from "react";
import { Smartphone, QrCode, Apple, Play } from "lucide-react";
import HondurasFlag from "./HondurasFlag";

export default function AppDownload() {
  return (
    <section id="app-download" className="py-24 bg-white relative overflow-hidden border-t border-gray-150">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#772cfc]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#9d57fb]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: App Copy*/}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#772cfc] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#9d57fb]" />
              Próximamente en Tiendas de Apps
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#2a1366] leading-tight font-sans">
              Lleva Fast Pay en <br className="hidden md:block" />
              tu Bolsillo <HondurasFlag className="inline-block w-5 h-5 align-middle" />
            </h2>
            <p className="text-[#484551] text-base leading-relaxed max-w-xl font-medium">
              Realiza compras en establecimientos físicos escaneando el código QR de caja, monitorea tu límite de crédito en tiempo real, activa tus alertas y paga tus cuotas sin fricciones gracias a nuestra futura aplicación nativa disponible pronto para iOS y Android.
            </p>

            <div className="space-y-4 border-l-2 border-[#772cfc]/10 pl-4 py-1 text-sm text-[#484551] font-medium">
              <p>✓ Monitoreo en vivo de compras y próximas cuotas quincenales.</p>
              <p>✓ Alertas instantáneas y recordatorios de pago automático (Autopay).</p>
              <p>✓ Escaneo de código QR para compras en tiempo real en tiendas aliadas.</p>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Apple App Store */}
              <button 
                onClick={() => alert("¡Excelente! Estaremos en la Apple App Store muy pronto para dispositivos iOS en Honduras.")}
                className="flex items-center gap-3 px-6 py-3 bg-[#2a1366] hover:bg-[#1f0e4b] text-white rounded-2xl transition-all duration-200 shadow-md cursor-pointer text-left"
                id="btn-store-apple"
              >
                <Apple className="w-8 h-8 fill-white" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 leading-none">Próximamente en</p>
                  <p className="text-sm font-black mt-1">App Store</p>
                </div>
              </button>

              {/* Google Play Store */}
              <button 
                onClick={() => alert("¡Excelente! Estaremos en Google Play Store muy pronto para todos los dispositivos Android en Honduras.")}
                className="flex items-center gap-3 px-6 py-3 bg-[#2a1366] hover:bg-[#1f0e4b] text-white rounded-2xl transition-all duration-200 shadow-md cursor-pointer text-left"
                id="btn-store-google"
              >
                <Play className="w-8 h-8 fill-white" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 leading-none">Disponible pronto en</p>
                  <p className="text-sm font-black mt-1">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Block: High-Fidelity App UI Mockup Layout */}
          <div className="lg:col-span-5 relative" id="mobile-mockup-wrapper">
            
            {/* Ambient Background Glow ring */}
            <div className="absolute inset-0 bg-radial from-[#772cfc]/15 to-transparent blur-2xl -z-10 rounded-full" />
            
            {/* Visual Phone Frame */}
            <div className="relative mx-auto w-[280px] h-[570px] bg-gray-900 rounded-[44px] p-3 shadow-2xl border-4 border-gray-800 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              
              {/* Camera Notch pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-30 flex items-center justify-between px-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900/50" />
                <span className="w-8 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Status Bar */}
              <div className="h-6 px-6 pt-1 text-white text-[9px] flex justify-between font-bold z-20 relative select-none">
                <span>9:41 AM</span>
                <div className="flex gap-1 items-center">
                  <span>5G</span>
                  <div className="w-4.5 h-2.5 border border-white/40 rounded-sm p-0.5 flex">
                    <div className="bg-white h-full w-3.5 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Inner Phone Screen App Content Mockup */}
              <div className="bg-[#FAF9FC] h-full rounded-[36px] overflow-hidden flex flex-col justify-between pt-4 pb-6 font-sans text-[#2a1366]">
                
                {/* Mock Header */}
                <div className="px-5 pt-3 flex justify-between items-center bg-transparent">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#772cfc] flex items-center justify-center text-white text-[11px] font-black italic shadow-sm">
                      f
                    </div>
                    <span className="text-xs font-black tracking-tight flex items-center">fastpay</span>
                  </div>
                  <span className="text-[8px] bg-[#772cfc]/10 text-[#772cfc] font-black px-2 py-0.5 rounded-full">Honduras</span>
                </div>

                {/* Mock Credit Balance Card */}
                <div className="px-4 mt-3">
                  <div className="bg-gradient-to-tr from-[#2a1366] to-[#772cfc] rounded-2xl p-4 text-white text-left shadow-md space-y-3 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                    <div>
                      <p className="text-[7.5px] font-bold text-[#eee3ff] uppercase tracking-wider">Cupo Disponible Lps</p>
                      <p className="text-xl font-black mt-0.5">Lps. 15,000.00</p>
                    </div>
                    <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[100%]" />
                    </div>
                    <div className="flex justify-between items-center text-[7px] font-bold text-white/90">
                      <span>Comprando a tu ritmo</span>
                      <span>0% Intereses</span>
                    </div>
                  </div>
                </div>

                {/* Mock Fast Pay Action Grid */}
                <div className="px-4 mt-3 grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-xl p-2 border border-gray-100 flex flex-col items-center justify-center text-center">
                    <QrCode className="w-4 h-4 text-[#772cfc]" />
                    <span className="text-[7.5px] font-black mt-1">Pagar QR</span>
                  </div>
                  <div className="bg-white rounded-xl p-2 border border-gray-100 flex flex-col items-center justify-center text-center">
                    <Smartphone className="w-4 h-4 text-[#772cfc]" />
                    <span className="text-[7.5px] font-black mt-1">Mis Planes</span>
                  </div>
                  <div className="bg-[#772cfc]/10 rounded-xl p-2 border border-[#772cfc]/20 flex flex-col items-center justify-center text-center">
                    <Smartphone className="w-4 h-4 text-[#772cfc]" />
                    <span className="text-[7.5px] font-black text-[#5613cc] mt-1">Soporte</span>
                  </div>
                </div>

                {/* Mock Recent Activity list */}
                <div className="px-4 mt-3 text-left space-y-1.5 flex-1 flex flex-col justify-start">
                  <p className="text-[8px] font-black uppercase text-gray-400 tracking-wider">Planes Activos</p>
                  
                  {/* Item 1 */}
                  <div className="bg-white rounded-xl p-2.5 border border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black text-[#2a1366]">Tienda Móvil El Gallo</p>
                      <p className="text-[7.5px] text-gray-400">Cuota 1 de 4 • Próximamente</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-[#2a1366]">Lps. 850.00</p>
                      <p className="text-[7px] text-emerald-500 font-bold">Autopay</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-white rounded-xl p-2.5 border border-gray-100 flex justify-between items-center opacity-85">
                    <div>
                      <p className="text-[9px] font-black text-[#2a1366]">Supermercado Colonia</p>
                      <p className="text-[7.5px] text-gray-400">Inicial pagada hoy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-emerald-600">Lps. 240.00</p>
                      <p className="text-[7px] text-gray-450 font-bold">Completado</p>
                    </div>
                  </div>
                </div>

                {/* Mock bottom slider */}
                <div className="px-6 py-2.5 bg-white border-t border-gray-50 flex justify-around items-center rounded-b-[36px] select-none text-gray-400">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#772cfc] shadow-xs" />
                  <span className="w-5 h-1.5 bg-gray-200 rounded-full" />
                  <span className="w-5 h-1.5 bg-gray-200 rounded-full" />
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
