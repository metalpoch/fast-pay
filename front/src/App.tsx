import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import AlliedStores from "./components/AlliedStores";
import CreditCalculator from "./components/CreditCalculator";
import PartnerSection from "./components/PartnerSection";
import AppDownload from "./components/AppDownload";
import Footer from "./components/Footer";
import SimulatorDashboard from "./components/SimulatorDashboard";
import RegistrationModal from "./components/RegistrationModal";
import HondurasFlag from "./components/HondurasFlag";
import { MockCreditAccount, Product, ActiveCuota, InstallmentBreakdown, MerchantInvoice } from "./types";
import { ShieldCheck, Sparkles, X, CheckSquare, Smartphone, HelpCircle, FileText, AlertTriangle, UserPlus, Store, ChevronUp, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const LOCAL_STORAGE_KEY = "fastpay_credit_sandbox_account_v2";

const INITIAL_ACCOUNT: MockCreditAccount = {
  totalLimit: 500,
  usedAmount: 0,
  availableLimit: 500,
  userName: "Alejandra",
  userLastName: "Zelaya",
  email: "ale.zelaya@gmail.com",
  phone: "504 9999-5555",
  dni: "0801199512345",
  location: "Tegucigalpa, Francisco Morazán",
  isRegistered: false, // Starts as unregistered so user undergoes KYC approval onboarding
  isAutopayEnabled: true,
  creditScore: 680,
  isBlocked: false,
  blockReason: "",
  savedCards: [],
  phoneVerified: true,
  isMerchantModeActive: true,
  merchantStoreName: "Fast Pay Store",
  merchantRtn: "08011995998877",
  merchantCategory: "Tecnología",
  merchantPhone: "+504 8888-2222",
  merchantBank: "Banco Atlántida",
  merchantBankAccount: "11020055748",
  merchantBalance: {
    balanceAretirar: 2400.00, // Pre-accrued mock commerce balance
    porRecibir: 4800.00,
    cuotasSurgidas: 8,
    cuotasRecibidas: 3500.00
  },
  merchantInvoices: [],
  activeCuotas: []
};

export default function App() {
  const [account, setAccount] = useState<MockCreditAccount>(INITIAL_ACCOUNT);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorTab, setSimulatorTab] = useState<"merchant" | "payouts">("merchant");
  const [activeNotification, setActiveNotification] = useState<{
    id: string;
    title: string;
    message: string;
    type: "success" | "info" | "bonus";
  } | null>(null);

  // Active in-store manual invoice pushed by the merchant for the client to pay
  const [pendingInvoice, setPendingInvoice] = useState<MerchantInvoice | null>(null);

  // Registration Modal controls
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationModalInitialTab, setRegistrationModalInitialTab] = useState<"user" | "merchant">("user");
  const [isFloatHubOpen, setIsFloatHubOpen] = useState(false);

  // Load account from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setAccount(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load local storage account sandbox", e);
    }
  }, []);

  // Sync to localStorage
  const saveAccount = (updated: MockCreditAccount) => {
    setAccount(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save local storage account sandbox", e);
    }
  };

  // Helper to trigger interactive dynamic toast notifications
  const triggerNotification = (
    title: string,
    message: string,
    type: "success" | "info" | "bonus" = "success"
  ) => {
    const id = Date.now().toString();
    setActiveNotification({ id, title, message, type });
    // Auto clear after 6 seconds
    setTimeout(() => {
      setActiveNotification((prev) => (prev?.id === id ? null : prev));
    }, 6000);
  };

  // Switch perspective mode or open the merchant workspace simulator
  const handleToggleMerchantMode = () => {
    const updated = {
      ...account,
      isMerchantModeActive: true
    };
    saveAccount(updated);
    setSimulatorTab("merchant");
    setIsSimulatorOpen(true); // Open drawer to show the switched tab
    triggerNotification(
      "Portal de Comercios",
      "Estás explorando la app como Comerciante Afiliado en Honduras.",
      "info"
    );
  };

  // Handler for Checkout purchase simulation (Client shop)
  const handleSimulatePurchase = (product: Product, storeName: string) => {
    const price = product.price;

    if (account.isBlocked) {
      triggerNotification(
        "Acción denegada",
        "Tu cuenta de Fast Pay se encuentra bloqueada por falta de pago. Regulariza tu deuda en mora en el simulador.",
        "info"
      );
      return;
    }

    if (price > account.availableLimit) {
      triggerNotification(
        "Monto excede tu límite",
        `Tu límite disponible de Lps. ${account.availableLimit.toFixed(2)} es insuficiente para comprar Lps. ${price.toFixed(2)}.`,
        "info"
      );
      return;
    }

    // Determine pricing range formula from PDF Page 6
    let downPaymentPercent = 10;
    let installmentCount = 2;
    let cycle: "Quincenal" | "Semanal" = "Quincenal";
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

    // Amortization schedule starting with down payment processed
    const breakdown: InstallmentBreakdown[] = [
      { installmentNumber: 1, amount: downPaymentValue, dueDate: "Hoy (Enganche Pagado)", isPaid: true }
    ];

    for (let i = 1; i <= installmentCount; i++) {
      breakdown.push({
        installmentNumber: i + 1,
        amount: installmentValue,
        dueDate: `En ${i * cycleDays} días`,
        isPaid: false
      });
    }

    const newCuota: ActiveCuota = {
      id: `cuota-${Date.now()}`,
      storeName,
      productName: product.name,
      totalPrice: price,
      totalInstallments: installmentCount + 1,
      installmentsPaid: 1,
      createdAt: new Date().toISOString().split("T")[0],
      paymentCycle: cycle,
      interestRate: 0,
      installments: breakdown
    };

    // Calculate limit reservation (Only the financed part subtracts from limit)
    const newUsedAmount = account.usedAmount + remainingValue;
    const newAvailableLimit = account.totalLimit - newUsedAmount;

    // Simulate Merchant Balance increase
    const merchantCommissionRate = price * 0.07;
    const merchantNetAccumulate = price - merchantCommissionRate;

    const updatedAccount: MockCreditAccount = {
      ...account,
      usedAmount: Number(newUsedAmount.toFixed(2)),
      availableLimit: Number(newAvailableLimit.toFixed(2)),
      activeCuotas: [newCuota, ...account.activeCuotas],
      merchantBalance: {
        ...account.merchantBalance,
        balanceAretirar: Math.min(30000, account.merchantBalance.balanceAretirar + merchantNetAccumulate),
        porRecibir: account.merchantBalance.porRecibir + merchantNetAccumulate,
        cuotasSurgidas: account.merchantBalance.cuotasSurgidas + installmentCount
      }
    };

    saveAccount(updatedAccount);
    setIsSimulatorOpen(true);

    triggerNotification(
      "Compra Exitosa HN",
      `Se debitó la cuota inicial de enganche de Lps. ${downPaymentValue.toFixed(2)} por tu compra de ${product.name} en ${storeName}. Mantenimiento: Lps. 0.00.`,
      "success"
    );
  };

  // Handler for slider quick simulator submission
  const handleQuickSimulate = (amount: number, installmentsCount: number, downPaymentPercent: number) => {
    if (account.isBlocked) {
      triggerNotification(
        "Cuenta bloqueada",
        "Tu billetera se encuentra bloqueada por mora activa.",
        "info"
      );
      return;
    }

    if (amount > account.availableLimit) {
      triggerNotification(
        "Cupo insuficiente",
        `Para calcular esta simulación de Lps. ${amount.toLocaleString()}, solicita un aumento de límite gratuito.`,
        "info"
      );
      return;
    }

    const downPaymentValue = amount * (downPaymentPercent / 100);
    const remainingValue = amount - downPaymentValue;
    const installmentValue = remainingValue / installmentsCount;
    const cycle = amount <= 1000 ? "Quincenal" : "Semanal";
    const cycleDays = amount <= 1000 ? 14 : 7;

    const breakdown: InstallmentBreakdown[] = [
      { installmentNumber: 1, amount: downPaymentValue, dueDate: "Hoy (Enganche Pagado)", isPaid: true }
    ];

    for (let i = 1; i <= installmentsCount; i++) {
      breakdown.push({
        installmentNumber: i + 1,
        amount: installmentValue,
        dueDate: `En ${i * cycleDays} días`,
        isPaid: false
      });
    }

    const newCuota: ActiveCuota = {
      id: `cuota-calc-${Date.now()}`,
      storeName: "Simulación de Canal",
      productName: "Gasto Rápido Simulado",
      totalPrice: amount,
      totalInstallments: installmentsCount + 1,
      installmentsPaid: 1,
      createdAt: new Date().toISOString().split("T")[0],
      paymentCycle: cycle,
      interestRate: 0,
      installments: breakdown
    };

    const newUsedAmount = account.usedAmount + remainingValue;
    const newAvailableLimit = account.totalLimit - newUsedAmount;

    const updatedAccount: MockCreditAccount = {
      ...account,
      usedAmount: Number(newUsedAmount.toFixed(2)),
      availableLimit: Number(newAvailableLimit.toFixed(2)),
      activeCuotas: [newCuota, ...account.activeCuotas]
    };

    saveAccount(updatedAccount);
    setIsSimulatorOpen(true);

    triggerNotification(
      "Simulación Cargada",
      `Has cargado un remanente financiado de Lps. ${remainingValue.toFixed(2)} en tu plan de billetera.`,
      "success"
    );
  };

  // Handler to pay off installments manually
  const handlePayInstallment = (cuotaId: string, installmentNumber: number) => {
    let paidAmount = 0;
    let storeName = "";
    let wasMoraActive = false;

    const updatedCuotas = account.activeCuotas.map(cuota => {
      if (cuota.id === cuotaId) {
        storeName = cuota.storeName;
        const updatedInsts = cuota.installments.map(inst => {
          if (inst.installmentNumber === installmentNumber && !inst.isPaid) {
            inst.isPaid = true;
            paidAmount = inst.amount;
            if (inst.isLate) {
              wasMoraActive = true;
              inst.isLate = false;
            }
          }
          return inst;
        });

        const paidCount = updatedInsts.filter(i => i.isPaid).length;

        return {
          ...cuota,
          installmentsPaid: paidCount,
          installments: updatedInsts
        };
      }
      return cuota;
    });

    if (paidAmount > 0) {
      // Find remaining unpaid active loans totals
      const newUsedAmount = Math.max(0, account.usedAmount - paidAmount);
      const newAvailableLimit = Math.max(0, account.totalLimit - newUsedAmount);

      // Remove completed cuotas and launch congratulations
      const activeFiltered = updatedCuotas.filter(cuota => {
        const hasUnpaid = cuota.installments.some(inst => !inst.isPaid);
        if (!hasUnpaid) {
          triggerNotification(
            "¡Felicidades, Plan Pagado!",
            `Has terminado de pagar tu crédito de ${cuota.productName} en ${cuota.storeName}. ¡Tu Score subió!`,
            "bonus"
          );
        }
        return hasUnpaid;
      });

      // If resolving late installment, evaluate unblocking account
      const remainsLate = activeFiltered.some(c => c.installments.some(inst => inst.isLate));

      const updatedAccount: MockCreditAccount = {
        ...account,
        usedAmount: Number(newUsedAmount.toFixed(2)),
        availableLimit: Number(newAvailableLimit.toFixed(2)),
        activeCuotas: activeFiltered,
        isBlocked: remainsLate,
        blockReason: remainsLate ? account.blockReason : "",
        creditScore: wasMoraActive 
          ? Math.min(850, account.creditScore + 80) // Repair credit score slightly
          : Math.min(850, account.creditScore + 10)
      };

      saveAccount(updatedAccount);
      triggerNotification(
        "Cuota Procesada",
        `Saldaste Lps. ${paidAmount.toFixed(2)} correctamente. Tu disponible de cuotas ha aumentado.`,
        "success"
      );
    }
  };

  // Handler to simulate delinquency on an installment (Late payment 15% charge)
  const handleSimulateLatePayment = (cuotaId: string) => {
    const updatedCuotas = account.activeCuotas.map(cuota => {
      if (cuota.id === cuotaId) {
        const insts = cuota.installments.map(inst => {
          if (!inst.isPaid && !inst.isLate) {
            inst.isLate = true;
            inst.amount = inst.amount * 1.15; // 15% fine applied directly
          }
          return inst;
        });
        return {
          ...cuota,
          installments: insts
        };
      }
      return cuota;
    });

    const updatedAccount: MockCreditAccount = {
      ...account,
      isBlocked: true,
      blockReason: "Posees cuotas retrasadas. Deberás solventar el pago de mora administrativa de 15% para desbloquear transacciones.",
      activeCuotas: updatedCuotas,
      creditScore: Math.max(300, account.creditScore - 140) // Drop credit score heavily
    };

    saveAccount(updatedAccount);
    triggerNotification(
      "⚠️ Amortización Vencida",
      "Mora del 15% aplicada por pago tardío. Cuenta inhabilitada para nuevas transacciones por 1 mes.",
      "info"
    );
  };

  // Handler to expand simulated wallet limit rotative
  const handleIncreaseLimit = () => {
    if (account.totalLimit >= 15000) {
      triggerNotification(
        "Límite máximo",
        "Has alcanzado el límite máximo permitido para la cartera estándar de Fast Pay de Lps. 15,000.",
        "info"
      );
      return;
    }

    const increaseAmount = Math.min(15000 - account.totalLimit, 500);
    const updatedLimit = account.totalLimit + increaseAmount;
    const updatedAvailable = account.availableLimit + increaseAmount;

    const updatedAccount: MockCreditAccount = {
      ...account,
      totalLimit: updatedLimit,
      availableLimit: updatedAvailable,
      creditScore: Math.min(850, account.creditScore + 15)
    };

    saveAccount(updatedAccount);
    triggerNotification(
      "¡Límite Incrementado!",
      `Aprobamos un incremento de cupo de +Lps. ${increaseAmount} por buen uso crediticio simulado.`,
      "bonus"
    );
  };

  // Merchant product editor helper (simulates adding store-product item)
  const handleAddMerchantProduct = (productName: string, price: number, description: string) => {
    // We append the product visually into our Allied Retailer list
    triggerNotification(
      "Ficha publicada",
      `El producto "${productName}" por Lps. ${price.toFixed(2)} se ha listado en el storefront de tu comercio.`,
      "success"
    );
  };

  // Merchant creation of Invoice pushed to Client celular
  const handleCreateInvoice = (invoice: MerchantInvoice) => {
    setPendingInvoice(invoice);
    setIsSimulatorOpen(false); // Hide database drawer so client sees the push banner notification flashing!
    triggerNotification(
      "Factura Enviada",
      `La factura interactiva ${invoice.invoiceNumber} por Lps. ${invoice.total} fue enviada al celular del cliente de Fast Pay.`,
      "bonus"
    );
  };

  // Client accepts and pays down payment on merchant manual invoice
  const handlePayPendingInvoice = () => {
    if (!pendingInvoice) return;
    
    const price = pendingInvoice.total;
    if (price > account.availableLimit) {
      triggerNotification(
        "Fondos Insuficientes",
        "Tu límite rotativo Fast Pay disponible es menor al monto de esta factura. Libera fondos pagando tus cuotas.",
        "info"
      );
      return;
    }

    const downValue = price * (pendingInvoice.downPaymentPercent / 100);
    const remainingVal = price - downValue;
    const instVal = remainingVal / pendingInvoice.installmentsCount;

    // build breakdown
    const insts: InstallmentBreakdown[] = [
      { installmentNumber: 1, amount: downValue, dueDate: "Hoy (Enganche Pagado)", isPaid: true }
    ];
    for (let i = 1; i <= pendingInvoice.installmentsCount; i++) {
      insts.push({
        installmentNumber: i + 1,
        amount: instVal,
        dueDate: `En ${i * 7} días (Semanal)`,
        isPaid: false
      });
    }

    const newCuota: ActiveCuota = {
      id: `invoice-cuota-${Date.now()}`,
      storeName: account.merchantStoreName, // From merchant setting
      productName: pendingInvoice.description,
      totalPrice: price,
      totalInstallments: pendingInvoice.installmentsCount + 1,
      installmentsPaid: 1,
      createdAt: new Date().toISOString().split("T")[0],
      paymentCycle: "Semanal",
      interestRate: 0,
      installments: insts
    };

    const newUsedAmount = account.usedAmount + remainingVal;
    const newAvailableLimit = account.totalLimit - newUsedAmount;

    // simulate Saturday accrual
    const commissionFee = price * 0.07;
    const netPayout = price - commissionFee;

    const updatedAccount: MockCreditAccount = {
      ...account,
      usedAmount: Number(newUsedAmount.toFixed(2)),
      availableLimit: Number(newAvailableLimit.toFixed(2)),
      activeCuotas: [newCuota, ...account.activeCuotas],
      merchantBalance: {
        ...account.merchantBalance,
        balanceAretirar: Math.min(30000, account.merchantBalance.balanceAretirar + netPayout),
        porRecibir: account.merchantBalance.porRecibir + netPayout,
        cuotasSurgidas: account.merchantBalance.cuotasSurgidas + pendingInvoice.installmentsCount
      }
    };

    saveAccount(updatedAccount);
    setPendingInvoice(null);
    setIsSimulatorOpen(true); // Open drawer wallet to see active loan

    triggerNotification(
      "Factura Pagada",
      `Autorizaste el pago inicial de enganche de Lps. ${downValue.toFixed(2)} para la factura ${pendingInvoice.invoiceNumber}.`,
      "success"
    );
  };

  // Autopay control action handler
  const handleToggleAutopay = (enabled: boolean) => {
    const updatedAccount = {
      ...account,
      isAutopayEnabled: enabled
    };
    saveAccount(updatedAccount);
    triggerNotification(
      "Configuración Guardada",
      `La domiciliación automática (Autopay) ahora está ${enabled ? "ACTIVADA (Segura)" : "DESACTIVADA (Riesgo de Mora)"}.`,
      "info"
    );
  };

  // KYC User registration handler
  const handleRegisterUser = (fields: Partial<MockCreditAccount>) => {
    const updated = {
      ...account,
      ...fields
    };
    saveAccount(updated);
    triggerNotification(
      "KYC Aprobado Instantáneamente",
      `¡Bienvenido Alejandra Zelaya! Motor de evaluación autorizó tu límite inicial de Lps. 500.00 de manera inmediata.`,
      "bonus"
    );
  };

  // Merchant state updater
  const handleUpdateMerchantState = (fields: Partial<MockCreditAccount>) => {
    const updated = {
      ...account,
      ...fields
    };
    saveAccount(updated);
  };

  const handleResetAccount = () => {
    saveAccount(INITIAL_ACCOUNT);
    setPendingInvoice(null);
    triggerNotification(
      "Sandbox Reiniciado",
      "Toda la base de datos local y simulaciones se han reestablecido al estado de nacimiento.",
      "info"
    );
  };

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-[#2a1366]">
      
      {/* Dynamic Header with layout toggling */}
      <Navbar
        onOpenSimulator={() => {
          setSimulatorTab("merchant");
          setIsSimulatorOpen(true);
        }}
        onScrollTo={scrollToSection}
        isMerchantModeActive={account.isMerchantModeActive}
        onToggleMerchantMode={handleToggleMerchantMode}
      />

      {/* Floating Interactive Toast overlay */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-24 right-4 md:right-10 z-50 p-4 rounded-2xl shadow-xl border w-full max-w-sm flex items-start gap-3 backdrop-blur-sm ${
              activeNotification.type === "success"
                ? "bg-white/95 border-emerald-100 text-[#2a1366]"
                : activeNotification.type === "bonus"
                ? "bg-[#2a1366] border-[#772cfc]/30 text-white"
                : "bg-white/95 border-indigo-100 text-[#2a1366]"
            }`}
            id="global-active-toast"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              activeNotification.type === "success"
                ? "bg-emerald-50 text-emerald-600"
                : activeNotification.type === "bonus"
                ? "bg-[#772cfc] text-white"
                : "bg-indigo-50 text-indigo-600"
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left font-sans flex-1">
              <h5 className="font-extrabold text-xs uppercase tracking-wider text-[#9d57fb]">
                {activeNotification.title}
              </h5>
              <p className="text-xs font-semibold mt-1 opacity-90 leading-tight">
                {activeNotification.message}
              </p>
            </div>
            <button
              onClick={() => setActiveNotification(null)}
              className="p-1 rounded-lg hover:bg-[#2a1366]/10 text-gray-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PENDING MERCHANT INVOICE CELL PHONE PUSH SIMULATOR NOTIFICATION BANNER */}
      <AnimatePresence>
        {pendingInvoice && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 bg-gradient-to-r from-[#2a1366] to-[#772cfc] text-white rounded-2xl p-5 shadow-2xl border border-[#772cfc]/40 w-full max-w-md text-left flex flex-col gap-3 font-sans"
            id="pending-invoice-notification-banner"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 text-xs">
                <span className="bg-amber-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">INTERACTIVO DE TIENDA 📲</span>
                <h5 className="font-extrabold text-sm mt-1">Factura Recibida: {pendingInvoice.invoiceNumber}</h5>
                <p className="text-[#ccc2f7] mt-0.5 font-semibold">{pendingInvoice.description}</p>
                <p className="font-bold text-sm mt-1 text-emerald-300">Total: Lps. {pendingInvoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <button 
                onClick={() => setPendingInvoice(null)} 
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-white/5 rounded-xl p-3 text-[10px] space-y-1">
              <p className="font-extrabold text-indigo-300">PLAN ACORDADO EN TIENDA:</p>
              <p>Monto de Enganche Hoy: <strong className="text-white">Lps. {(pendingInvoice.total * (pendingInvoice.downPaymentPercent / 100)).toFixed(2)}</strong> ({pendingInvoice.downPaymentPercent}%)</p>
              <p>Remanente: <strong className="text-white">{pendingInvoice.installmentsCount} pagos quincenales</strong> del saldo restante.</p>
            </div>

            <div className="flex gap-2 text-xs font-bold w-full">
              <button
                onClick={handlePayPendingInvoice}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow cursor-pointer transition-colors text-center"
              >
                ✓ Aceptar y Pagar Enganche
              </button>
              <button
                onClick={() => setPendingInvoice(null)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white/90 rounded-xl cursor-pointer"
              >
                Rechazar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sections Layout */}
      <main className="flex-1">
        {/* Landing Hero Screen */}
        <Hero
          onOpenSimulator={() => {
            setSimulatorTab("wallet");
            setIsSimulatorOpen(true);
          }}
          onScrollTo={scrollToSection}
        />



        {/* Features list side-by-side replicating PDF page 1 */}
        <Features />

        {/* How it Works timeline section */}
        <HowItWorks />

        {/* Credit Calculator Section utilizing 10%/20%/30% brackets */}
        <CreditCalculator
          onQuickSimulate={handleQuickSimulate}
          availableLimit={account.availableLimit}
        />

        {/* Allied Retail Stores Grid */}
        <AlliedStores
          onSimulatePurchase={handleSimulatePurchase}
          availableLimit={account.availableLimit}
          isRegistered={account.isRegistered}
          onOpenSimulator={() => {
            setSimulatorTab("merchant");
            setIsSimulatorOpen(true);
          }}
        />

        {/* Interactive App Download and Device Live Showcase section */}
        <AppDownload />

        {/* Partner Section dark backdrop promotion */}
        <PartnerSection
          onJoinAsPartner={() => {
            setSimulatorTab("merchant");
            setIsSimulatorOpen(true);
            triggerNotification(
              "Registrar Comercio (RTN)",
              "Completa tu RTN y cuenta de banco para cobrar tus ventas por adelantado con Fast Pay.",
              "info"
            );
          }}
        />
      </main>

      {/* Footer Branding links */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenSimulator={() => {
          setSimulatorTab("merchant");
          setIsSimulatorOpen(true);
        }}
      />

      {/* PERSISTENT FLOATING DOCK IN THE BOTTOM RIGHT - DIRECT USER KYC REGISTRATION ONLY */}
      <div className="fixed bottom-6 right-6 z-40 font-sans">
        {/* Pulse Floating Main Activator */}
        <button
          onClick={() => {
            setRegistrationModalInitialTab("user");
            setIsRegistrationModalOpen(true);
          }}
          className="flex items-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#2a1366] to-[#772cfc] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-extrabold text-xs tracking-wide group relative hover:shadow-indigo-500/20 hover:shadow-lg"
          id="btn-direct-kyc-registration"
        >
          {/* Pulse glow background effect */}
          <span className="absolute -inset-0.5 bg-gradient-to-r from-[#772cfc] to-[#9d57fb] rounded-full blur-xs opacity-40 group-hover:opacity-75 transition-opacity" />
          
            <div className="relative z-10 flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider">
              <UserPlus className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Registrarme con Fast Pay (KYC) <HondurasFlag className="inline-block w-4 h-4 align-middle" /></span>
            </div>
        </button>
      </div>

      {/* RENDER DYNAMIC FULL-FIDELITY REGISTRATION MODAL */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        initialTab={registrationModalInitialTab}
        creditAccount={account}
        onRegisterUser={handleRegisterUser}
        onUpdateMerchantState={handleUpdateMerchantState}
        triggerNotification={triggerNotification}
      />

      {/* The slide drawer simulator panel representing Fast Pay Smartphone App */}
      <SimulatorDashboard
        creditAccount={account}
        onPayInstallment={handlePayInstallment}
        onIncreaseLimit={handleIncreaseLimit}
        onResetAccount={handleResetAccount}
        onRegisterUser={handleRegisterUser}
        onUpdateMerchantState={handleUpdateMerchantState}
        onSimulateLatePayment={handleSimulateLatePayment}
        onAddMerchantProduct={handleAddMerchantProduct}
        onCreateInvoice={handleCreateInvoice}
        onPayInvoice={handlePayPendingInvoice}
        onToggleAutopay={handleToggleAutopay}
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        activeTab={simulatorTab}
        onTabChange={setSimulatorTab}
      />

    </div>
  );
}
