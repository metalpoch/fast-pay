export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface AlliedStore {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  featuredProducts: Product[];
  rtn?: string;
  facebook?: string;
  instagram?: string;
}

export interface InstallmentBreakdown {
  installmentNumber: number;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  isLate?: boolean;
}

export interface ActiveCuota {
  id: string;
  storeName: string;
  productName: string;
  totalPrice: number;
  totalInstallments: number;
  installmentsPaid: number;
  installments: InstallmentBreakdown[];
  createdAt: string;
  paymentCycle: "Quincenal" | "Semanal";
  interestRate: 0; // 0% interest
}

export interface SavedCard {
  cardNumber: string;
  expiry: string;
  cvv: string;
  holderName: string;
}

export interface MerchantInvoice {
  id: string;
  invoiceNumber: string;
  description: string;
  total: number;
  installmentsCount: number;
  downPaymentPercent: number; // 10, 20, 30
  status: "pending" | "approved";
}

export interface MerchantPayoutState {
  balanceAretirar: number; // Max 30,000 Lps
  porRecibir: number;
  cuotasSurgidas: number;
  cuotasRecibidas: number;
}

export interface MockCreditAccount {
  totalLimit: number;
  usedAmount: number;
  availableLimit: number;
  activeCuotas: ActiveCuota[];
  userName: string;
  userLastName: string;
  email: string;
  phone: string;
  dni: string;
  location: string;
  isRegistered: boolean;
  isAutopayEnabled: boolean;
  creditScore: number;
  isBlocked: boolean;
  blockReason: string;
  savedCards: SavedCard[];
  phoneVerified: boolean;
  // Merchant specific virtual state
  isMerchantModeActive: boolean;
  merchantStoreName: string;
  merchantRtn: string;
  merchantCategory: string;
  merchantPhone: string;
  merchantBank: string;
  merchantBankAccount: string;
  merchantBalance: MerchantPayoutState;
  merchantInvoices: MerchantInvoice[];
}
