<div align="center">
  <img src="./src/assets/logo.png" alt="Fast Pay" width="140" />
  <h1>Fast Pay</h1>
  <p><strong>Compra ahora, paga después. Sin intereses.</strong></p>
  <p>Landing page y simulador interactivo de financiamiento BNPL para clientes y comercios en Honduras.</p>
</div>

---

## Descripción

Fast Pay es una aplicación web de una sola página (SPA) que presenta el producto de financiamiento
**Buy Now, Pay Later (BNPL)** y permite recorrer una demo completa del flujo sin backend:

- Simulación de compras en comercios aliados con pago en cuotas al 0 % de interés.
- Calculadora de cuotas por montos y plazos.
- Onboarding KYC para clientes (registro, verificación y aprobación simulada).
- Portal de comercios: registro con RTN, facturación, saldo por retirar y cobros pendientes.
- Modo cliente / comercio con notificaciones y estado persistido en el navegador.

> **Nota:** todo el comportamiento es una simulación local. No se envían datos a ningún servidor ni
> se procesan pagos reales.

## Características

- **Landing responsive** con hero, beneficios, cómo funciona, comercios aliados y descarga de la app.
- **Simulador de compras** con selección de productos y desglose de cuotas.
- **Calculadora de crédito** interactiva con rangos de monto y plazos.
- **KYC de clientes** en drawer con validación de identidad y consentimientos.
- **Registro de comercios** en drawer con datos fiscales y bancarios.
- **Panel de comercio** con facturas, saldo disponible, cuotas por recibir y retiros.
- **Persistencia local** del estado de la cuenta entre recargas.
- **Animaciones** con Motion, iconografía con Lucide y estilos con Tailwind CSS 4.

## Stack

| Herramienta | Versión | Uso |
| --- | --- | --- |
| [React](https://react.dev/) | 19 | Interfaz de usuario |
| [TypeScript](https://www.typescriptlang.org/) | 5.8 | Tipado estático |
| [Vite](https://vite.dev/) | 6 | Servidor de desarrollo y build |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [Motion](https://motion.dev/) | 12 | Animaciones |
| [Lucide React](https://lucide.dev/) | 0.546 | Iconos |

## Requisitos

- **Node.js** 20 o superior (recomendado 22 LTS).
- **pnpm** 9 o superior (recomendado, el repositorio incluye `pnpm-lock.yaml`).
  También puedes usar `npm` si lo prefieres.

## Inicio rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Levantar el servidor de desarrollo
pnpm dev
```

Vite mostrará la URL local (por defecto `http://localhost:5173`). El servidor escucha en todas las
interfaces gracias a `--host`, útil para probar desde un móvil en la misma red.

### Con npm

```bash
npm install
npm run dev
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia Vite en modo desarrollo con HMR y acceso por red. |
| `pnpm build` | Verifica tipos con TypeScript y genera el build de producción en `dist/`. |
| `pnpm preview` | Sirve localmente el contenido de `dist/` para revisar el build. |
| `pnpm lint` | Ejecuta `tsc --noEmit` sin generar archivos. |
| `pnpm clean` | Elimina la carpeta `dist/`. |

## Estructura del proyecto

```text
.
├── public/
│   └── favicon.png
├── src/
│   ├── assets/                    # Imágenes y logo procesados por Vite
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── AlliedStores.tsx       # Comercios aliados y simulación de compra
│   │   ├── CreditCalculator.tsx
│   │   ├── PartnerSection.tsx
│   │   ├── AppDownload.tsx
│   │   ├── Footer.tsx
│   │   ├── KYCRegistrationDrawer.tsx
│   │   ├── MerchantRegistrationDrawer.tsx
│   │   └── HondurasFlag.tsx
│   ├── App.tsx                    # Estado global de la demo y composición de secciones
│   ├── data.ts                    # Comercios, productos y cuotas de ejemplo
│   ├── types.ts                   # Modelos de dominio (cuenta, cuotas, facturas, etc.)
│   ├── index.css                  # Tailwind, tema y estilos globales
│   └── main.tsx                   # Punto de entrada
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

## Cómo funciona la demo

1. **Modo cliente:** el usuario explora comercios aliados, simula una compra y elige el número de
   cuotas. Si no ha completado el KYC, la app lo invita a registrarse.
2. **Modo comercio:** desde la barra de navegación o la sección de partners se abre el registro de
   comercios y el panel con facturas y saldos.
3. **Persistencia:** el estado de la cuenta se guarda en `localStorage` con la clave
   `fastpay_credit_sandbox_account_v2`. Para reiniciar la demo, borra los datos del sitio desde las
   herramientas del navegador o ejecuta en la consola:

   ```js
   localStorage.removeItem("fastpay_credit_sandbox_account_v2");
   location.reload();
   ```

## Variables de entorno

El proyecto **no requiere variables de entorno** para desarrollo ni para el build.

Si en el futuro necesitas configuración del lado del cliente, crea un archivo `.env.local` a partir
de `.env.example` y usa el prefijo `VITE_`:

```dotenv
VITE_API_URL="https://api.fastpay.example"
```

```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

Recuerda que cualquier variable con prefijo `VITE_` queda expuesta en el bundle del navegador.

## Despliegue

```bash
pnpm build
```

El resultado queda en `dist/` y puede publicarse en cualquier hosting estático:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- Nginx / Apache

Configuración sugerida:

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Node version:** 20 o superior

Como la navegación usa anclas (`#seccion`) y no hay rutas del lado del cliente, no se necesita una
regla de rewrite para SPA. Si más adelante se agregan rutas, añade un fallback a `index.html`.

## Calidad y verificación

Antes de abrir un pull request o desplegar:

```bash
pnpm lint
pnpm build
```

`pnpm build` ya incluye la verificación de tipos, por lo que un build exitoso garantiza que el
proyecto compila sin errores de TypeScript.

## Licencia

Proyecto privado. Todos los derechos reservados.
