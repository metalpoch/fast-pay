import { useState, useEffect } from "react";
import { Menu, X, Smartphone, Sparkles, Store, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "../assets/logo.png";

interface NavbarProps {
  onOpenSimulator: () => void;
  onScrollTo: (sectionId: string) => void;
  isMerchantModeActive: boolean;
  onToggleMerchantMode: () => void;
}

export default function Navbar({
  onOpenSimulator,
  onScrollTo,
  isMerchantModeActive,
  onToggleMerchantMode,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Beneficios", id: "benefits" },
    { label: "Cómo funciona", id: "how-it-works" },
    { label: "Comercios", id: "shops" },
    { label: "Socios", id: "partners" }
  ];

  const handleMenuClick = (id: string) => {
    setIsOpen(false);
    onScrollTo(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F5F5F7]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo matching Image 5 */}
        <div 
          onClick={() => onScrollTo("hero")}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 transition-transform group-hover:scale-105 flex items-center justify-center">
            <img
              src={logo}
              alt="Fast Pay Logo"
              className="w-10 h-10 object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#2a1366] select-none font-sans">
            fast<span className="text-[#772cfc]">pay</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className="text-[#484551] font-semibold text-sm hover:text-[#772cfc] transition-colors relative group py-2"
              id={`nav-item-${item.id}`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#772cfc] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4" id="desktop-actions">
          <button
            onClick={() => onScrollTo("app-download")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#772cfc] hover:bg-[#6020ce] text-white font-extrabold rounded-full text-xs transition-all duration-200 cursor-pointer shadow-md shadow-[#772cfc]/15"
            id="btn-nav-download"
          >
            <Smartphone className="w-4 h-4" />
            Descargar App
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden items-center gap-2" id="mobile-menu-trigger">
          <button
            onClick={() => onScrollTo("app-download")}
            className="p-2 border border-[#772cfc]/20 text-[#772cfc] bg-[#772cfc]/5 rounded-full text-xs cursor-pointer"
            id="btn-nav-download-mobile-icon"
            title="Descargar App"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#2a1366] hover:bg-[#F5F5F7] rounded-lg transition-colors cursor-pointer"
            id="btn-burger"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#F5F5F7]"
            id="mobile-nav-drawer"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className="text-left py-2.5 text-[#2a1366] font-bold text-base border-b border-[#F5F5F7]"
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onScrollTo("app-download");
                  }}
                  className="w-full py-3 bg-[#772cfc] hover:bg-[#6020ce] text-white font-bold rounded-xl shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-nav-download-mobile-drawer"
                >
                  <Smartphone className="w-5 h-5" />
                  Descargar App
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
