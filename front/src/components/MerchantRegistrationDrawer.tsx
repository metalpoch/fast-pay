import React, { useState, useEffect } from "react";
import { 
  X, ShieldCheck, RefreshCw, Laptop, DollarSign, Sparkles
} from "lucide-react";
import { MockCreditAccount } from "../types";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/logo.png";

interface MerchantRegistrationDrawerProps {
  creditAccount: MockCreditAccount;
  onPayInstallment: (cuotaId: string, installmentNumber: number) => void;
  onIncreaseLimit: () => void;
  onResetAccount: () => void;
  onRegisterUser: (fields: Partial<MockCreditAccount>) => void;
  onUpdateMerchantState: (fields: Partial<MockCreditAccount>) => void;
  onSimulateLatePayment: (cuotaId: string) => void;
  onPayInvoice: (invoiceId: string) => void;
  onToggleAutopay: (enabled: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  activeTab?: "merchant" | "payouts";
  onTabChange?: (tab: "merchant" | "payouts") => void;
}

export default function MerchantRegistrationDrawer({
  creditAccount,
  onResetAccount,
  onUpdateMerchantState,
  isOpen,
  onClose,
  activeTab: controlledActiveTab,
  onTabChange,
}: MerchantRegistrationDrawerProps) {
  const [localActiveTab, setLocalActiveTab] = useState<"merchant" | "payouts">("merchant");
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : localActiveTab;
  const setActiveTab = onTabChange !== undefined ? onTabChange : setLocalActiveTab;
  
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

  const handleWithdrawPayout = () => {
    if (creditAccount.merchantBalance.balanceAretirar <= 0) return;
    onUpdateMerchantState({
      merchantBalance: {
        ...creditAccount.merchantBalance,
        balanceAretirar: 0,
        cuotasRecibidas: creditAccount.merchantBalance.cuotasRecibidas + creditAccount.merchantBalance.balanceAretirar
      }
    });
    alert(`Liquidación de Lps. ${creditAccount.merchantBalance.balanceAretirar.toLocaleString(undefined, { minimumFractionDigits: 2 })} procesada con éxito a tu cuenta de ${creditAccount.merchantBank}.`);
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

            {/* View perspective switch switcher inside drawer */}
            <div className="bg-white border-b border-[#F5F5F7] px-6 py-2 flex gap-1 justify-around text-xs font-bold shadow-xs">
              <button
                onClick={() => setActiveTab("merchant")}
                className={`py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === "merchant"
                    ? "text-[#772cfc] bg-[#772cfc]/5 font-black border border-[#772cfc]/10"
                    : "text-[#484551] hover:text-[#2a1366]"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                Registrar mi Comercio RTN
              </button>
              {creditAccount.isMerchantModeActive && (
                <button
                  onClick={() => setActiveTab("payouts")}
                  className={`py-2 px-4 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === "payouts"
                      ? "text-[#772cfc] bg-[#772cfc]/5 font-black border border-[#772cfc]/10"
                      : "text-[#484551] hover:text-[#2a1366]"
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  Sábados de Pago
                </button>
              )}
            </div>

            {/* Dynamic Content Body scrolls */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* MERCHANT MANAGER PANEL */}
              {activeTab === "merchant" && (
                <>
                  {/* MERCHANT REGISTRATION FORM - Always visible */}
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
                </>
              )}

              {/* PAYOUTS SECTION */}
              {activeTab === "payouts" && (
                <div className="space-y-6 text-left">
                  
                  {/* Ledger Balance panel */}
                  <div className="bg-white border border-[#F5F5F7] rounded-3xl p-6 text-left space-y-4 shadow-sm relative">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                      Corte Semanal Activo
                    </span>
                    <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Tu saldo Fast Pay</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-black text-[#2a1366]">
                          Lps. {creditAccount.merchantBalance.balanceAretirar.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-gray-500 font-semibold mt-1">Nómina disponible para retirar</p>
                      </div>
                      <div>
                        <p className="text-2xl font-black text-indigo-500">
                          Lps. {creditAccount.merchantBalance.porRecibir.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[10px] text-gray-500 font-semibold mt-1">Diferidos / Recibiendo a plazo</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-150 pt-4 mt-2">
                      <button
                        onClick={handleWithdrawPayout}
                        disabled={creditAccount.merchantBalance.balanceAretirar <= 0}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Desembolsar a cuenta de {creditAccount.merchantBank}
                      </button>
                    </div>
                  </div>

                  {/* Business statistics visual match */}
                  <div className="p-4 bg-white border border-[#F5F5F7] rounded-2xl space-y-3 shadow-2xs">
                    <h5 className="font-extrabold text-xs text-[#2a1366] uppercase tracking-wide">Métricas del Canal Sandbox</h5>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[9px] text-[#484551] uppercase font-bold">Cuotas Facturadas</p>
                        <p className="text-lg font-black text-[#2a1366] mt-0.5">{creditAccount.merchantBalance.cuotasSurgidas}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[9px] text-[#484551] uppercase font-bold">Cobrado en Sandbox</p>
                        <p className="text-lg font-black text-emerald-600 mt-0.5">Lps. {creditAccount.merchantBalance.cuotasRecibidas.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#772cfc]/5 border border-[#772cfc]/10 rounded-2xl flex gap-3 text-[#5613cc]">
                    <Sparkles className="w-5 h-5 shrink-0 text-[#772cfc]" />
                    <p className="text-[10px] leading-relaxed font-semibold">
                      Los pagos en Fast Pay se liquidan de forma garantizada todos los **Sábados de Pago**. Tus clientes financian sus cuotas de forma semanal o quincenal, pero tú obtienes la liquidez de inmediato de parte de Fast Pay.
                    </p>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
