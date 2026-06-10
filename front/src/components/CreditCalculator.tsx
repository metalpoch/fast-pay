import { useState } from "react";
import { Calculator, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface CreditCalculatorProps {
  onQuickSimulate: (amount: number, installmentsCount: number, downPaymentPercent: number) => void;
  availableLimit: number;
}

export default function CreditCalculator({ onQuickSimulate, availableLimit }: CreditCalculatorProps) {
  const [amount, setAmount] = useState<number>(2400);

  // Determine pricing brackets based on Lps. amount according to Plan de Negocios Page 6
  let downPaymentPercent = 10;
  let installmentCount = 2;
  let cycle = "Quincenal";
  let cycleDays = 14;

  if (amount <= 1000) {
    downPaymentPercent = 10;
    installmentCount = 2;
    cycle = "Quincenal";
    cycleDays = 14;
  } else if (amount <= 5000) {
    downPaymentPercent = 20;
    installmentCount = 4;
    cycle = "Semanal";
    cycleDays = 7;
  } else if (amount <= 10000) {
    downPaymentPercent = 30;
    installmentCount = 6;
    cycle = "Semanal";
    cycleDays = 7;
  } else {
    downPaymentPercent = 30;
    installmentCount = 8;
    cycle = "Semanal";
    cycleDays = 7;
  }

  const downPaymentValue = amount * (downPaymentPercent / 100);
  const remainingValue = amount - downPaymentValue;
  const installmentValue = remainingValue / installmentCount;

  const handleApply = () => {
    onQuickSimulate(amount, installmentCount, downPaymentPercent);
  };

  const getDueDates = () => {
    const dates = [];
    // Day 0: Down payment
    dates.push({ label: "Hoy (Enganche)", desc: "Pago inicial", amount: downPaymentValue });

    for (let i = 1; i <= installmentCount; i++) {
      dates.push({
        label: `Cuota ${i}`,
        desc: `En ${i * cycleDays} días (${cycle})`,
        amount: installmentValue
      });
    }
    return dates;
  };

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block Left */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#772cfc] flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" />
              Calculadora Inteligente
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#2a1366] tracking-tight leading-tight mt-2 mb-6">
              Haz cuentas. Sin intereses.
            </h2>
            <p className="text-[#484551] text-sm md:text-base leading-relaxed mb-6">
              Arrastra el control deslizante para estimar tu compra en Lempiras y visualizar el cronograma de cuotas conforme a los límites oficiales de crédito de Fast Pay. ¡Pagas cero intereses reales!
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#772cfc]/10 text-[#772cfc] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-sm font-bold text-[#2a1366]">0% Tasa de Interés</h4>
                  <p className="text-xs text-[#485551]">Siempre. Sin tarifas ocultas, de mantenimiento de cuenta ni seguros obligatorios.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <h4 className="text-sm font-bold text-[#2a1366]">Monto Inicial (Enganche)</h4>
                  <p className="text-xs text-[#485551]">Se paga un enganche de 10%, 20% o 30% según el rango de precio para respaldar tu compra.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator block Right */}
          <div className="lg:col-span-7 bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-50 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-[#772cfc]" />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-[#2a1366]">Simula tu Compra</span>
                </div>
                <div className="text-xs font-semibold text-[#772cfc] bg-[#772cfc]/5 px-3 py-1.5 rounded-full border border-[#772cfc]/10">
                  0% Interés Garantizado
                </div>
              </div>

              {/* Slider for Lps Amount */}
              <div className="mb-8 text-left">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#484551]">Valor del producto</label>
                  <span className="text-xl font-black text-[#2a1366]">Lps. {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="15000"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#772cfc]"
                  id="amount-slider"
                />
                <div className="flex justify-between text-[10px] text-[#484551] font-semibold mt-1">
                  <span>Min: Lps. 200</span>
                  <span>Max Autorizado: Lps. 15,000</span>
                </div>
              </div>

              {/* Dynamic Brackets specs information based on current amount */}
              <div className="mb-6 p-4 bg-indigo-50/40 border border-indigo-100/20 rounded-2xl text-left text-xs text-[#2a1366] space-y-2">
                <p className="font-bold uppercase tracking-wider text-[10px] text-[#772cfc]">Fórmula del Rango de Precios (Plan Oficial):</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <div>
                    <span className="text-[#484551] block text-[10px]">DOWN PAYMENT (ENGANCHE)</span>
                    <span className="font-extrabold text-sm">{downPaymentPercent}% (Lps. {downPaymentValue.toFixed(2)})</span>
                  </div>
                  <div>
                    <span className="text-[#484551] block text-[10px]">REMANENTE EMITIDO EN</span>
                    <span className="font-extrabold text-sm">{installmentCount} cuotas {cycle}s</span>
                  </div>
                </div>
              </div>

              {/* Outputs Summary ledger box */}
              <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 text-left mb-6">
                <div>
                  <p className="text-[10px] text-[#484551] font-bold uppercase tracking-wider">Pago por Cuota</p>
                  <p className="text-2xl font-black text-[#772cfc]">Lps. {installmentValue.toFixed(2)}</p>
                  <p className="text-[10px] text-[#484551] font-medium">Fijas cada {cycleDays} días</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#484551] font-bold uppercase tracking-wider">Enganche Hoy</p>
                  <p className="text-2xl font-black text-[#2a1366]">Lps. {downPaymentValue.toFixed(2)}</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Saldo total financiado: Lps. {remainingValue.toFixed(2)}</p>
                </div>
              </div>

              {/* Installments visual timeline */}
              <div className="mb-8 text-left">
                <p className="text-xs font-bold text-[#2a1366] mb-3">Cronograma de desembolsos estimados</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {getDueDates().map((date, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 text-center flex flex-col justify-between">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#772cfc] mb-1">{date.label}</p>
                      <p className="text-sm font-extrabold text-[#2a1366]">Lps. {date.amount.toFixed(0)}</p>
                      <p className="text-[9px] font-medium text-[#484551] mt-1">{date.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanatory footnote */}
              <p className="text-center text-xs text-[#484551] font-semibold bg-[#772cfc]/5 p-3 rounded-xl border border-[#772cfc]/10">
                💡 Los montos y plazos se calculan automáticamente en tiempo real basados en los límites de crédito oficiales de Fast Pay Honduras.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
