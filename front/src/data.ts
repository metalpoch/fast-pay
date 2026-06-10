import { AlliedStore } from "./types";

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
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
        category: "Supermercados"
      },
      {
        id: "fresh-02",
        name: "Café Orgánico de Especialidad Copán 1KG",
        price: 240.00,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400",
        category: "Supermercados"
      },
      {
        id: "fresh-03",
        name: "Combo de Desayuno Familiar Saludable",
        price: 340.00,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
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
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400",
        category: "Moda & Estilo"
      },
      {
        id: "urban-02",
        name: "Zapatillas Casuales Hyper-Walk",
        price: 2400.00,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
        category: "Moda & Estilo"
      },
      {
        id: "urban-03",
        name: "Mochila Impermeable Urban Pack",
        price: 550.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
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
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
        category: "Tecnología"
      },
      {
        id: "tech-02",
        name: "Reloj Inteligente Fit Tracker Plus",
        price: 3600.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
        category: "Tecnología"
      },
      {
        id: "tech-03",
        name: "Teclado Mecánico Retro Slim",
        price: 1900.00,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400",
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
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400",
        category: "Hogar & Jardín"
      },
      {
        id: "hogar-02",
        name: "Macetero de Cerámica Artesanal Zen",
        price: 490.00,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400",
        category: "Hogar & Jardín"
      },
      {
        id: "hogar-03",
        name: "Juego de Sábanas de Algodón Egipcio",
        price: 1800.00,
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400",
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
