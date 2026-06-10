import { useState } from "react";
import { ALLIED_STORES } from "../data";
import { AlliedStore, Product } from "../types";
import { ShoppingBag, Sparkles, CreditCard, X, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import HondurasFlag from "./HondurasFlag";

interface AlliedStoresProps {
  onSimulatePurchase: (product: Product, storeName: string) => void;
  availableLimit: number;
  isRegistered: boolean;
  onOpenSimulator: () => void;
}

export default function AlliedStores({ 
  onSimulatePurchase, 
  availableLimit, 
  isRegistered, 
  onOpenSimulator 
}: AlliedStoresProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [checkoutProduct, setCheckoutProduct] = useState<{ product: Product; store: AlliedStore } | null>(null);

  const categories = ["Todos", "Supermercados", "Moda & Estilo", "Tecnología", "Hogar & Jardín"];

  const filteredStores = selectedCategory === "Todos"
    ? ALLIED_STORES
    : ALLIED_STORES.filter(store => store.category === selectedCategory);

  const handleCheckoutSubmit = () => {
    if (checkoutProduct) {
      onSimulatePurchase(checkoutProduct.product, checkoutProduct.store.name);
      setCheckoutProduct(null);
    }
  };

  const getAmortization = (price: number) => {
    let downPaymentPercent = 10;
    let installmentCount = 2;
    let cycle = "Quincenal";
    let cycleDays = 14;

    if (price <= 1000) {
      downPaymentPercent = 10;
      installmentCount = 2;
      cycle = "Quincenal";
      cycleDays = 14;
    } else if (price <= 5000) {
      downPaymentPercent = 20;
      installmentCount = 4;
      cycle = "Semanal";
      cycleDays = 7;
    } else if (price <= 10000) {
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

    const downPaymentValue = price * (downPaymentPercent / 100);
    const remainingValue = price - downPaymentValue;
    const installmentValue = remainingValue / installmentCount;

    const schedules = [];
    // Down payment
    schedules.push({
      id: "down-pay",
      label: `Hoy (${downPaymentPercent}% Enganche)`,
      dateLabel: "Desembolso Inmediato",
      amount: downPaymentValue,
      isDownPayment: true
    });

    // Installments
    for (let i = 1; i <= installmentCount; i++) {
      schedules.push({
        id: `installment-${i}`,
        label: `Cuota ${i} (${cycle})`,
        dateLabel: `En ${i * cycleDays} días`,
        amount: installmentValue,
        isDownPayment: false
      });
    }

    return {
      downPaymentPercent,
      downPaymentValue,
      installmentCount,
      installmentValue,
      cycle,
      schedules
    };
  };

  return (
    <section id="shops" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#772cfc] flex items-center gap-1.5 uppercase">
              <ShoppingBag className="w-4 h-4" /> Comercios aliados en Honduras
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#2a1366] tracking-tight mt-2 leading-tight">
              Compra donde te encanta
            </h2>
            <p className="text-[#484551] text-sm md:text-base mt-2 max-w-lg leading-relaxed">
              Usa Fast Pay tanto en tiendas en línea como en locales físicos. Explora categorías y simula una compra ahora mismo.
            </p>
          </div>

          {/* Available limit indicator matching Lps */}
          <div className="mt-4 md:mt-0 bg-white border border-gray-150 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left font-sans">
              <p className="text-[10px] text-[#484551] font-bold uppercase tracking-wider">Tu límite disponible</p>
              <p className="text-lg font-black text-[#2a1366]">Lps. {availableLimit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none" id="categories-filter">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[#772cfc] text-white shadow-sm shadow-[#772cfc]/15"
                  : "bg-white text-[#484551] hover:bg-gray-100 border border-gray-200/50"
              }`}
              id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="allied-stores-grid">
          {filteredStores.map(store => (
            <div
              key={store.id}
              className="bg-white rounded-[24px] border border-gray-150 p-6 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between text-left"
              id={`store-card-${store.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#772cfc]/5 flex items-center justify-center text-2xl shadow-inner select-none font-sans">
                      {store.logo}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-extrabold text-[#2a1366]">{store.name}</h3>
                      <span className="text-[10px] font-bold text-[#772cfc] bg-[#772cfc]/5 border border-[#772cfc]/10 px-2.5 py-0.5 rounded-full">
                        {store.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[#484551] text-sm leading-relaxed mb-6">
                  {store.description}
                </p>

                {/* Featured Products */}
                <div className="border-t border-gray-100 pt-4" id={`store-products-${store.id}`}>
                  <p className="text-xs font-bold text-[#2a1366] mb-3">Simula compra de productos:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {store.featuredProducts.map(prod => (
                      <div
                        key={prod.id}
                        className="bg-gray-50/50 border border-gray-100 rounded-xl p-2.5 flex flex-col justify-between group"
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden mb-2 relative bg-gray-100">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 select-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="text-left h-full flex flex-col justify-between">
                          <h4 className="text-[10px] font-bold text-[#2a1366] line-clamp-2 min-h-7 leading-tight mb-1">
                            {prod.name}
                          </h4>
                          <div>
                            <p className="text-xs font-black text-[#772cfc] mt-1">Lps. {prod.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                            <button
                              onClick={() => setCheckoutProduct({ product: prod, store })}
                              className="w-full mt-2 py-1 bg-[#2a1366] hover:bg-[#1a0c43] text-white rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              Simular Plan
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Plan Simulator Modal */}
      <AnimatePresence>
        {checkoutProduct && (() => {
          const plan = getAmortization(checkoutProduct.product.price);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs" id="checkout-modal">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col text-[#2a1366]"
              >
                <div className="bg-[#2a1366] text-white p-6 justify-between flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#772cfc] flex items-center justify-center font-black italic">
                        f
                      </div>
                      <span className="font-extrabold text-lg tracking-tight flex items-center gap-1">Simulador de Plan Fast Pay <HondurasFlag className="inline-block w-5 h-5 align-middle" /></span>
                    </div>
                  <button
                    onClick={() => setCheckoutProduct(null)}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6 border-b border-gray-100 flex items-center gap-4 text-left bg-gray-50/50">
                  <img
                    src={checkoutProduct.product.image}
                    alt={checkoutProduct.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-100 bg-white"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#772cfc] bg-[#772cfc]/5 px-2.5 py-0.5 rounded-full">
                      {checkoutProduct.store.name}
                    </span>
                    <h4 className="text-base font-extrabold mt-1 text-[#2a1366]">{checkoutProduct.product.name}</h4>
                    <p className="text-sm font-black text-[#772cfc] mt-0.5">Lps. {checkoutProduct.product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                {/* Installments Plan details */}
                <div className="p-6 text-left flex-1 overflow-y-auto space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#772cfc] bg-[#772cfc]/5 border border-[#772cfc]/10 px-3 py-1.5 rounded-full w-fit">
                    <Sparkles className="w-3.5 h-3.5" />
                    Fórmula oficial: {plan.downPaymentPercent}% de Enganche + {plan.installmentCount} Cuotas {plan.cycle}s
                  </div>

                  {/* Amortization timeline list */}
                  <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                    {plan.schedules.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          item.isDownPayment
                            ? "bg-[#772cfc]/5 border-[#772cfc]/20 font-bold"
                            : "bg-gray-50/40 border-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                            item.isDownPayment ? "bg-[#772cfc] text-white" : "bg-[#2a1366]/10 text-[#2a1366]"
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-[#2a1366]">{item.label}</p>
                            <p className="text-[10px] text-[#484551] font-medium">{item.dateLabel}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-[#2a1366]">Lps. {item.amount.toFixed(2)}</p>
                          <p className="text-[9px] text-[#772cfc] font-bold">0% Interés</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#772cfc]/5 border border-[#772cfc]/10 rounded-2xl flex gap-3 text-[#5613cc]">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-[#772cfc] mt-0.5" />
                    <div>
                      <p className="text-xs font-extrabold">¿Cómo comprarás en {checkoutProduct.store.name}?</p>
                      <p className="text-[10.5px] leading-relaxed mt-0.5 font-medium">
                        Adquiere tu producto pagando solo el enganche de <strong>Lps. {plan.downPaymentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong> al instante. Al estar en la tienda física de tu elección o sitio web aliado, abres la App de Fast Pay, escaneas el código QR en caja, ¡y listo! El comercio recibe el pago completo de inmediato.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setCheckoutProduct(null);
                      document.getElementById("app-download")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-4 rounded-xl font-black bg-[#2a1366] hover:bg-[#1a0c43] text-white shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm"
                  >
                    Ver cómo descargar la App
                  </button>
                  <button
                    onClick={() => setCheckoutProduct(null)}
                    className="w-full py-2 bg-transparent text-[#2a1366]/70 hover:text-[#2a1366] font-bold text-xs"
                  >
                    Volver a Tiendas
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
