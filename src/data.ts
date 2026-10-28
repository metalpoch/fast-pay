import { AlliedStore } from "./types";
import store1 from "./assets/store1.avif";
import store2 from "./assets/store2.avif";
import store3 from "./assets/store3.avif";
import store4 from "./assets/store4.avif";
import store5 from "./assets/store5.avif";
import store6 from "./assets/store6.avif";
import store7 from "./assets/store7.avif";
import store8 from "./assets/store8.avif";
import store9 from "./assets/store9.avif";
import store10 from "./assets/store10.avif";
import store11 from "./assets/store11.avif";
import store12 from "./assets/store12.avif";

export const ALLIED_STORES: AlliedStore[] = [
  {
    id: "super-fresh",
    name: "Ahorra Max",
    logo: "🍎",
    category: "Supermercados",
    description: "Tus compras semanales, alimentos del día y víveres para la familia con flexibilidad de cuotas en Honduras.",
    featuredProducts: [
      {
        id: "fresh-01",
        name: "Super Canasta Familiar Premium",
        price: 850.00,
        image: store1,
        category: "Supermercados"
      },
      {
        id: "fresh-02",
        name: "Café Orgánico de Especialidad Copán 1KG",
        price: 240.00,
        image: store2,
        category: "Supermercados"
      },
      {
        id: "fresh-03",
        name: "Combo de Desayuno Familiar Saludable",
        price: 340.00,
        image: store3,
        category: "Supermercados"
      }
    ],
    rtn: "08019012345678",
    facebook: "ahorramax_hn",
    instagram: "ahorramax_hn"
  },
  {
    id: "urban-style",
    name: "Urban Aura",
    logo: "🧥",
    category: "Moda & Estilo",
    description: "Moda contemporánea, zapatillas de edición limitada y accesorios que reflejan tu estilo de vida.",
    featuredProducts: [
      {
        id: "urban-01",
        name: "Chaqueta Bomber Americana Minimalista",
        price: 1200.00,
        image: store4,
        category: "Moda & Estilo"
      },
      {
        id: "urban-02",
        name: "Zapatillas Casuales Hyper-Walk",
        price: 2400.00,
        image: store5,
        category: "Moda & Estilo"
      },
      {
        id: "urban-03",
        name: "Mochila Impermeable Urban Pack",
        price: 550.00,
        image: store6,
        category: "Moda & Estilo"
      }
    ],
    rtn: "05011995876543",
    facebook: "urbanaura_hn",
    instagram: "urbanaura_retail"
  },
  {
    id: "pixel-tech",
    name: "Pixel Sound",
    logo: "🎧",
    category: "Tecnología",
    description: "Lleva tu productividad y entretenimiento al siguiente nivel con gadgets de última generación.",
    featuredProducts: [
      {
        id: "tech-01",
        name: "Audífonos Inalámbricos Pro-Sound ANC",
        price: 5100.00,
        image: store7,
        category: "Tecnología"
      },
      {
        id: "tech-02",
        name: "Reloj Inteligente Fit Tracker Plus",
        price: 3600.00,
        image: store8,
        category: "Tecnología"
      },
      {
        id: "tech-03",
        name: "Teclado Mecánico Retro Slim",
        price: 1900.00,
        image: store9,
        category: "Tecnología"
      }
    ],
    rtn: "08012002135702",
    facebook: "pixelsound_hn",
    instagram: "pixelsound.hn"
  },
  {
    id: "hogar-deco",
    name: "Hogar & Confort",
    logo: "🪴",
    category: "Hogar & Jardín",
    description: "Decoración y mobiliario acogedor de alta calidad para renovar los espacios de tu hogar.",
    featuredProducts: [
      {
        id: "hogar-01",
        name: "Lámpara de Escritorio LED Inteligente",
        price: 1150.00,
        image: store10,
        category: "Hogar & Jardín"
      },
      {
        id: "hogar-02",
        name: "Macetero de Cerámica Artesanal Zen",
        price: 490.00,
        image: store11,
        category: "Hogar & Jardín"
      },
      {
        id: "hogar-03",
        name: "Juego de Sábanas de Algodón Egipcio",
        price: 1800.00,
        image: store12,
        category: "Hogar & Jardín"
      }
    ],
    rtn: "01011980998877",
    facebook: "hogardeconfort_hn",
    instagram: "hogardeconfort"
  }
];

export const MOCKED_ACTIVE_INITIAL_CUOTAS = [
  {
    id: "cuota-init-1",
    storeName: "Urban Aura",
    productName: "Zapatillas Casuales Hyper-Walk",
    totalPrice: 2400.00,
    totalInstallments: 4,
    installmentsPaid: 1,
    createdAt: "2026-06-01",
    paymentCycle: "Semanal" as const,
    interestRate: 0 as const,
    installments: [
      { installmentNumber: 1, amount: 480.00, dueDate: "Hoy (Procesado)", isPaid: true },
      { installmentNumber: 2, amount: 480.00, dueDate: "En 7 días", isPaid: false },
      { installmentNumber: 3, amount: 480.00, dueDate: "En 14 días", isPaid: false },
      { installmentNumber: 4, amount: 480.00, dueDate: "En 21 días", isPaid: false }
    ]
  }
];
