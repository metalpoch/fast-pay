import React, { useState, useEffect } from "react";
import { 
  X, ShieldCheck, RefreshCw, Laptop
} from "lucide-react";
import { MockCreditAccount } from "../types";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/logo.png";

interface MerchantRegistrationDrawerProps {
  creditAccount: MockCreditAccount;
  onResetAccount: () => void;
  onUpdateMerchantState: (fields: Partial<MockCreditAccount>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function MerchantRegistrationDrawer({
  creditAccount,
  onResetAccount,
  onUpdateMerchantState,
  isOpen,
  onClose,
}: MerchantRegistrationDrawerProps) {

  // Merchant register form state
  const [merStoreName, setMerStoreName] = useState(creditAccount.merchantStoreName || "Mi Tienda Móvil");
  const [merRtn, setMerRtn] = useState(creditAccount.merchantRtn || "08011999123456");
  const [merPhone, setMerPhone] = useState(creditAccount.merchantPhone || "+504 9999-1111");
  const [merCategory, setMerCategory] = useState(creditAccount.merchantCategory || "Moda & Estilo");
  const [merBank, setMerBank] = useState(creditAccount.merchantBank || "Banco Atlántida");
  const [merBankAccount, setMerBankAccount] = useState(creditAccount.merchantBankAccount || "1102030456");

  // High-fidelity business plan fields: Viewpoint del Comercio
  const [merGerenteNombre, setMerGerenteNombre] = useState("Santiago Espinal");
  const [merGerenteDni, setMerGerenteDni] = useState("0801-1988-12345");
  const [merRazonSocial, setMerRazonSocial] = useState("Inversiones Comerciales S. de R.L.");
  const [merUbicacion, setMerUbicacion] = useState("Centro Comercial Las Cascadas, Tegucigalpa");
  const [merEmail, setMerEmail] = useState("contacto@mitiendamovil.com");
  const [merSocials, setMerSocials] = useState("@mitiendamovil_hn");
  const [merBankAccountHolder, setMerBankAccountHolder] = useState("Santiago Espinal / Mi Tienda");

  // Synchronize internal state on account update
  useEffect(() => {
    setMerStoreName(creditAccount.merchantStoreName || "Mi Tienda Móvil");
    setMerRtn(creditAccount.merchantRtn || "08011999123456");
    setMerPhone(creditAccount.merchantPhone || "+504 9999-1111");
    setMerCategory(creditAccount.merchantCategory || "Moda & Estilo");
  }, [creditAccount]);

  const handleMerchantRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMerchantState({
      merchantStoreName: merStoreName,
      merchantRtn: merRtn,
      merchantPhone: merPhone,
      merchantCategory: merCategory,
      merchantBank: merBank,
      merchantBankAccount: merBankAccount,
      isMerchantModeActive: true
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-sans text-[#2a1366]" id="simulator-drawer-backdrop">
          
          {/* Dismiss backdrop */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="relative w-full max-w-lg bg-[#FAF9FC] h-full shadow-2xl flex flex-col z-10 border-l border-[#F5F5F7]"
            id="simulator-drawer-body"
          >
            {/* Drawer Header branding */}
            <div className="p-6 border-b border-[#F5F5F7] flex items-center justify-between bg-[#2a1366] text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 transition-transform hover:rotate-3 flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Fast Pay Logo"
                    className="w-10 h-10 object-contain rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left font-sans">
                  <h3 className="font-extrabold text-base leading-tight">Portal de Comercios</h3>
                  <p className="text-[10px] text-[#ccc2f7] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <Laptop className="w-4 h-4 text-[#9d57fb]" /> Fast Pay Honduras
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={onResetAccount}
                  title="Reiniciar simulador"
                  className="p-2 hover:bg-white/10 rounded-lg text-white/80 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/10 rounded-full text-white/80 transition-colors cursor-pointer"
                  id="btn-close-simulator"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Dynamic Content Body scrolls */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* MERCHANT REGISTRATION FORM */}
              <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[24px] border border-[#F5F5F7] p-6 text-left shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-2 text-[#772cfc] mb-1">
                      <Laptop className="w-5 h-5" />
                      <h4 className="text-sm font-extrabold uppercase tracking-wider">Registrar mi Comercio (RTN)</h4>
                    </div>
                    <p className="text-xs text-[#484551] leading-relaxed">
                      Cualquier comerciante con RTN en Honduras puede registrarse en Fast Pay para vender más. Tú cobras el 100% por adelantado libre de riesgo de impagos.
                    </p>

                    <form onSubmit={handleMerchantRegisterSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Gerente General</label>
                          <input
                            type="text"
                            required
                            value={merGerenteNombre}
                            onChange={(e) => setMerGerenteNombre(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="Nombre y Apellido"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">DNI del Gerente</label>
                          <input
                            type="text"
                            required
                            value={merGerenteDni}
                            onChange={(e) => setMerGerenteDni(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="Ej. 0801-1990-12345"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Razón Social</label>
                          <input
                            type="text"
                            required
                            value={merRazonSocial}
                            onChange={(e) => setMerRazonSocial(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="Razón Social Completa"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Nombre del Negocio</label>
                          <input
                            type="text"
                            required
                            value={merStoreName}
                            onChange={(e) => setMerStoreName(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="Ej. Fast Pay Store"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">RTN de la Empresa</label>
                          <input
                            type="text"
                            required
                            value={merRtn}
                            onChange={(e) => setMerRtn(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="14 dígitos"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Rubro de la Empresa</label>
                          <select
                            value={merCategory}
                            onChange={(e) => setMerCategory(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc] bg-white text-xs"
                          >
                            <option>Moda</option>
                            <option>Niños y Bebés</option>
                            <option>Hogar y Jardín</option>
                            <option>Salud y Belleza</option>
                            <option>Tecnología</option>
                            <option>Viajes y Entretenimiento</option>
                            <option>Otros</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Ubicación Exacta de la Empresa</label>
                        <input
                          type="text"
                          required
                          value={merUbicacion}
                          onChange={(e) => setMerUbicacion(e.target.value)}
                          className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                          placeholder="Ubicación física"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">WhatsApp / Contacto</label>
                          <input
                            type="text"
                            required
                            value={merPhone}
                            onChange={(e) => setMerPhone(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="+504 9999-0000"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Correo Electrónico</label>
                          <input
                            type="email"
                            required
                            value={merEmail}
                            onChange={(e) => setMerEmail(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="correo@empresa.hn"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Instagram o Redes</label>
                          <input
                            type="text"
                            required
                            value={merSocials}
                            onChange={(e) => setMerSocials(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="@negocio_hn"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Titular de Cuenta Bancaria</label>
                          <input
                            type="text"
                            required
                            value={merBankAccountHolder}
                            onChange={(e) => setMerBankAccountHolder(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="Nombre en el banco"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Banco para Liquidación</label>
                          <select
                            value={merBank}
                            onChange={(e) => setMerBank(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc] bg-white text-xs"
                          >
                            <option>Banco Atlántida</option>
                            <option>BAC Credomatic</option>
                            <option>Ficohsa</option>
                            <option>Banpais</option>
                            <option>Occidente</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Número de Cuenta</label>
                          <input
                            type="text"
                            required
                            value={merBankAccount}
                            onChange={(e) => setMerBankAccount(e.target.value)}
                            className="w-full p-2 rounded-lg border border-gray-200 focus:outline-[#772cfc]"
                            placeholder="Ej. 110200..."
                          />
                        </div>
                      </div>

                      {/* High-Risk category restriction info banner */}
                      <div className="p-3 bg-red-50 text-[10.5px] border border-red-100 rounded-xl text-red-800 leading-relaxed space-y-1">
                        <p className="font-extrabold flex items-center gap-1">
                          ⚠️ Restricción de Rubros (Bajo Riesgo Compliance)
                        </p>
                        <p>
                          No se permiten negocios informales de alto riesgo ni compras a largo plazo de alto costo (terrenos, vehículos, pulperías, alcohol, o servicios médicos).
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#2a1366] hover:bg-[#1f0e4b] text-white rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        Unirse como Comercio Aliado
                      </button>
                    </form>
                  </motion.div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
