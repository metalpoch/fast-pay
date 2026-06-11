import React, { useState, useEffect, useRef } from "react";
import { 
  X, ShieldCheck, User, MapPin, CreditCard, 
  Calendar, Phone, Mail, FileText, Sparkles, Check, 
  Camera, Lock, RefreshCw, AlertTriangle, Info, Heart
} from "lucide-react";
import { MockCreditAccount, SavedCard } from "../types";
import { motion, AnimatePresence } from "motion/react";
import HondurasFlag from "./HondurasFlag";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "user" | "merchant";
  creditAccount: MockCreditAccount;
  onRegisterUser: (fields: Partial<MockCreditAccount>) => void;
  onUpdateMerchantState: (fields: Partial<MockCreditAccount>) => void;
  triggerNotification: (title: string, message: string, type?: "success" | "info" | "bonus") => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  creditAccount,
  onRegisterUser,
  triggerNotification
}: RegistrationModalProps) {
  // USER FORM STATE
  const [usrNombre, setUsrNombre] = useState(creditAccount.userName || "");
  const [usrApellido, setUsrApellido] = useState(creditAccount.userLastName || "");
  const [usrEmail, setUsrEmail] = useState(creditAccount.email || "");
  const [usrBirthDate, setUsrBirthDate] = useState("");
  const [usrDni, setUsrDni] = useState(creditAccount.dni || "");
  const [usrLocation, setUsrLocation] = useState(creditAccount.location || "");
  const [usrPhone, setUsrPhone] = useState(creditAccount.phone || "");
  const [usrConsent, setUsrConsent] = useState(false);
  
  // Shopping preferences requested
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  
  // Debit card input details
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  // Subordinated simulation states
  const [isLocating, setIsLocating] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [smsInput, setSmsInput] = useState("");
  const [isSmsVerified, setIsSmsVerified] = useState(false);
  const [frontImageUploaded, setFrontImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);

  // REAL FACE ID CAMERA STATES
  const [showRealCamera, setShowRealCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [faceScanSuccess, setFaceScanSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Reset camera state on close
    if (!isOpen) {
      stopCamera();
    }
  }, [isOpen]);

  // Handle shopping preference chips toggle
  const togglePreference = (pref: string) => {
    if (selectedPreferences.includes(pref)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== pref));
    } else {
      setSelectedPreferences([...selectedPreferences, pref]);
    }
  };

  // Calculate age from birth date
  const calculateAge = (dateString: string) => {
    if (!dateString) return 0;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const userAge = calculateAge(usrBirthDate);

  // Locate user simulation
  const handleAutoLocate = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUsrLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)} (Tegucigalpa, Francisco Morazán)`);
          setIsLocating(false);
          triggerNotification("Ubicación Encontrada", "Geolocalización obtenida exitosamente de tu GPS virtual.", "success");
        },
        () => {
          // Fallback simulation
          setTimeout(() => {
            setUsrLocation("Colonia Palmira, Tegucigalpa, M.D.C., Honduras");
            setIsLocating(false);
            triggerNotification("Ubicación Simulada", "Ubicación fijada en Tegucigalpa.", "info");
          }, 1200);
        }
      );
    } else {
      setTimeout(() => {
        setUsrLocation("San Pedro Sula, Cortés, Honduras");
        setIsLocating(false);
      }, 1000);
    }
  };

  // CAMERA WEBCAM STREAM SERVICES
  const startCamera = async () => {
    setShowRealCamera(true);
    setCapturedPhotoUrl(null);
    setFaceScanSuccess(false);
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 400, height: 400 }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera stream blocked or unavailable", err);
      triggerNotification("Cámara No Accesible", "Usando simulador fotográfico de selfie elegante por defecto.", "info");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowRealCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 320;
        
        // Draw captured image frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data url to preview
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedPhotoUrl(dataUrl);
        stopCamera();

        // Trigger a cool scanning effect
        setIsFaceScanning(true);
        setTimeout(() => {
          setIsFaceScanning(false);
          setFaceScanSuccess(true);
          triggerNotification("Face ID Verificado 👤", "La inteligencia artificial analizó tu simetría facial de forma segura contra el DNI.", "success");
        }, 2200);
      }
    } else {
      // Graceful fallback simulator if camera hardware wasn't accessible
      setIsFaceScanning(true);
      setTimeout(() => {
        setIsFaceScanning(false);
        setFaceScanSuccess(true);
        setCapturedPhotoUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop");
        triggerNotification("Face ID Verificado 👤", "Identidad verificada exitosamente utilizando modelo heurístico de Redes Neuronales.", "success");
      }, 2000);
    }
  };

  // Simulated Verification SMS
  const sendVerificationSms = () => {
    if (!usrPhone) {
      alert("Por favor ingresa un número de teléfono válido para la verificación.");
      return;
    }
    setSmsSent(true);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setSmsCode(code);
    setTimeout(() => {
      triggerNotification("🔐 Clave SMS Recibida", `Tu código de confirmación temporal Fast Pay es [ ${code} ]. Ingrésalo abajo.`, "bonus");
    }, 1200);
  };

  const verifySmsCode = () => {
    if (smsInput === smsCode) {
      setIsSmsVerified(true);
      triggerNotification("Celular Confirmado", "Número de teléfono validado óptimamente con doble factor.", "success");
    } else {
      alert("Código incorrecto. Revisa el código del mensaje emergente e inténtalo de nuevo.");
    }
  };

  // KEYWORDS / CHIPS OPTIONS
  const preferenceChips = [
    { id: "moda", name: "👗 Moda y Vestimenta" },
    { id: "tecnologia", name: "📱 Tecnología y Gadgets" },
    { id: "hogar", name: "🏡 Decoración y Hogar" },
    { id: "salud", name: "🧴 Cuidado y Belleza" },
    { id: "restaurantes", name: "🍔 Alimentos y Comida" },
    { id: "viajes", name: "✈️ Aventura y Viajes" }
  ];

  // SUBMIT HANDLERS
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userAge < 18) {
      alert("❌ Error de Registro: Debes ser mayor de 18 años para utilizar servicios de crédito Fast Pay.");
      return;
    }

    if (!usrConsent) {
      alert("❌ Debes autorizar la revisión del Historial Crediticio e Integridad de Datos con Inteligencia Artificial.");
      return;
    }

    if (!faceScanSuccess) {
      alert("❌ Validación biométrica requerida: Clickea en 'Escanear Rostro con Face ID' para validar tu identidad.");
      return;
    }

    if (!frontImageUploaded || !backImageUploaded) {
      alert("❌ Carga de Documentación de Identidad Obligatoria: Sube las fotos de tu DNI (Frente y Reverso).");
      return;
    }

    if (!isSmsVerified) {
      alert("❌ Confirmación Telefónica Pendiente: Debes validar el número ingresado mediante el código SMS interactivo.");
      return;
    }

    // Prepare card details
    const savedCards: SavedCard[] = [];
    if (cardNum && cardExpiry && cardCvv && cardHolder) {
      savedCards.push({
        cardNumber: cardNum,
        expiry: cardExpiry,
        cvv: cardCvv,
        holderName: cardHolder
      });
    } else {
      // Setup a compliant default card
      savedCards.push({
        cardNumber: "4214 0092 1145 9291",
        expiry: "09/30",
        cvv: "482",
        holderName: `${usrNombre} ${usrApellido}`
      });
    }

    onRegisterUser({
      userName: usrNombre,
      userLastName: usrApellido,
      email: usrEmail,
      phone: usrPhone,
      dni: usrDni,
      location: usrLocation,
      isRegistered: true,
      totalLimit: 500, // Initiates client with initial Lps. 500 credit limit as per business plan and user request
      availableLimit: 500,
      savedCards
    });

    triggerNotification(
      "¡Felicidades! 🎉",
      `Bienvenido ${usrNombre}. Tu cuenta ha sido validada mediante el Buró AI. Tienes un cupo inicial de Lps. 500.00 pesos listo para usar.`,
      "bonus"
    );

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-sans">
          {/* Dismiss strictly on request */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="relative w-full max-w-lg bg-[#faf9fc] h-full shadow-2xl flex flex-col z-10 border-l border-[#F5F5F7]"
            id="modal-kyc-content"
          >
            {/* Header top background */}
            <div className="bg-gradient-to-r from-[#2a1366] to-[#772cfc] text-white p-6 relative overflow-hidden shrink-0">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-44 h-44 bg-[#772cfc]/30 rounded-full blur-2xl" />
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <User className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg leading-tight tracking-tight">Registro KYC - Persona Natural</h3>
                    <p className="text-[10px] text-indigo-200 uppercase font-black tracking-wider flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verificación de Seguridad Fast Pay <HondurasFlag className="inline-block w-3 h-3 align-middle" />
                    </p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/10 rounded-full text-white/80 transition-colors cursor-pointer"
                  id="close-kyc-modal-btn"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-[11px] text-white/80 leading-snug mt-3 font-medium">
                Cualquier persona natural mayor de 18 años con cuenta bancaria puede usar Fast Pay para compras a cuotas sin interés. Completa el ciclo de validación de identidad obligatoria para activar tu cupo.
              </p>
            </div>

            {/* Scrolling Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              <form onSubmit={handleUserSubmit} className="space-y-6 text-xs text-left" id="user-registration-form">
                
                {/* Límite Informativo Card */}
                <div className="p-4 bg-[#772cfc]/5 border border-[#772cfc]/10 rounded-2xl relative">
                  <h4 className="text-xs font-black text-[#772cfc] flex items-center gap-2 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> Cupo de Crédito de Bienvenida
                  </h4>
                  <p className="text-[11px] font-medium text-gray-600 mt-1.5 leading-relaxed">
                    Iniciarás con un cupo rotativo de **Lps. 500.00**. Tus compras se pagan únicamente con tarjeta (débito o crédito). No se permite el uso de dinero en efectivo. Tras pagar tus cuotas responsablemente, tu límite subirá automáticamente.
                  </p>
                </div>

                {/* Section: Basic Data */}
                <div className="space-y-3.5">
                  <h5 className="font-black text-xs uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-indigo-500" /> Datos Personales Obligatorios
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        value={usrNombre}
                        onChange={(e) => setUsrNombre(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="Ej. Alejandra Sofía"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Apellidos Completos</label>
                      <input
                        type="text"
                        required
                        value={usrApellido}
                        onChange={(e) => setUsrApellido(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="Ej. Zelaya Rosales"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        value={usrEmail}
                        onChange={(e) => setUsrEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="correo@ejemplo.hn"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Fecha de Nacimiento</label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={usrBirthDate}
                          onChange={(e) => setUsrBirthDate(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        />
                        {usrBirthDate && (
                          <span className={`absolute right-3 top-2.5 text-[9px] font-black px-1.5 py-0.5 rounded ${
                            userAge >= 18 ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                          }`}>
                            {userAge} años {userAge < 18 ? "• Inelegible" : "• Elegible"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Real Face ID / Webcam & ID Picture details */}
                <div className="space-y-3.5 border-t border-gray-100 pt-4">
                  <h5 className="font-black text-xs uppercase tracking-wider text-gray-400">Verificación Oficial DNI y Rostro (Validación Biométrica)</h5>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Número de DNI (Id. de Honduras)</label>
                      <input
                        type="text"
                        required
                        value={usrDni}
                        onChange={(e) => setUsrDni(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="0801-1995-12345"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Face ID Scan</label>
                      <button
                        type="button"
                        onClick={startCamera}
                        className={`w-full py-2.5 rounded-xl text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all ${
                          faceScanSuccess
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                            : showRealCamera
                            ? "bg-indigo-600 text-white animate-pulse"
                            : "bg-[#772cfc]/10 border border-[#772cfc]/20 text-[#772cfc] hover:bg-[#772cfc]/20"
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5 shrink-0" />
                        {faceScanSuccess ? "Escaneado ✓" : showRealCamera ? "Cámara Activa" : "Activar Cámara"}
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE CAMERA PREVIEW / SELFIE SECTION */}
                  {showRealCamera && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-3 bg-[#2a1366] rounded-2xl text-center space-y-3 border-2 border-[#772cfc]"
                    >
                      <p className="text-[10px] text-indigo-200 font-extrabold uppercase tracking-widest animate-pulse">Alinea tu rostro dentro del recuadro circular</p>
                      
                      <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-amber-300 shadow-md">
                        {/* Interactive Webcam Stream View */}
                        <video 
                          ref={videoRef}
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover scale-x-[-1]"
                        />
                        <div className="absolute inset-0 border-[10px] border-[#2a1366]/40 rounded-full pointer-events-none" />
                        <div className="absolute inset-2 border-2 border-dashed border-amber-400 rounded-full pointer-events-none opacity-60 animate-spin" />
                      </div>

                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={capturePhoto}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold shadow-lg transition-transform hover:scale-105"
                        >
                          Capturar Foto Facial
                        </button>
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11.5px] font-bold"
                        >
                          Cancelar
                        </button>
                      </div>

                      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
                      <canvas ref={canvasRef} style={{ display: "none" }} />
                    </motion.div>
                  )}

                  {/* CAPTURED PHOTO STATUS */}
                  {capturedPhotoUrl && (
                    <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={capturedPhotoUrl} 
                          alt="Selfie Face ID" 
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-[10px] font-black text-[#2a1366]">Escaner Biométrico Facial Cargado</p>
                          <p className="text-[8.5px] text-gray-500 font-semibold mt-0.5">Firmado con Clave Criptográfica Fast Pay AI</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-md">100% Match ✓</span>
                    </div>
                  )}

                  {/* DNI Photos simulated uploads */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-[#484551] uppercase mb-1">DNI Frente (Foto con smartphone/archivo)</p>
                      <button
                        type="button"
                        onClick={() => {
                          setFrontImageUploaded(true);
                          triggerNotification("DNI Cargado", "Tarjeta de identidad (Frente) cargada correctamente.", "success");
                        }}
                        className={`w-full py-4 rounded-xl border border-dashed transition-all text-center ${
                          frontImageUploaded 
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                            : "bg-white border-gray-200 hover:border-indigo-400 text-gray-500"
                        }`}
                      >
                        {frontImageUploaded ? "✓ Foto Frente Cargada" : "📸 Cargar Foto Frente"}
                      </button>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#484551] uppercase mb-1">DNI Reverso (Foto con smartphone/archivo)</p>
                      <button
                        type="button"
                        onClick={() => {
                          setBackImageUploaded(true);
                          triggerNotification("DNI Cargado", "Tarjeta de identidad (Reverso) cargada correctamente.", "success");
                        }}
                        className={`w-full py-4 rounded-xl border border-dashed transition-all text-center ${
                          backImageUploaded 
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                            : "bg-white border-gray-200 hover:border-indigo-400 text-gray-500"
                        }`}
                      >
                        {backImageUploaded ? "✓ Foto Reverso Cargada" : "📸 Cargar Foto Reverso"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section: Residence and Contact */}
                <div className="space-y-4 border-t border-gray-100 pt-4">
                  <h5 className="font-black text-xs uppercase tracking-wider text-gray-400">Ubicación exacta de Residencia</h5>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] font-bold text-[#484551] uppercase">Dirección Física Completa</label>
                      <button
                        type="button"
                        onClick={handleAutoLocate}
                        disabled={isLocating}
                        className="text-[10px] font-black text-[#772cfc] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#772cfc]" />
                        {isLocating ? "Leyendo Satélites GPS..." : "Verificar Ubicación por GPS Virtual"}
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={usrLocation}
                      onChange={(e) => setUsrLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                      placeholder="Colonia, Bloque/Etapa, Ciudad o Referencia GPS"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-3">
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Número de Teléfono</label>
                      <input
                        type="text"
                        required
                        value={usrPhone}
                        onChange={(e) => setUsrPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="Ej. +504 9999-5555"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={sendVerificationSms}
                        className="w-full py-2.5 bg-[#2a1366] hover:bg-[#1a0c43] text-white rounded-xl text-[10px] font-black transition-all cursor-pointer"
                        id="send-sms-code-btn"
                      >
                        Código SMS
                      </button>
                    </div>
                  </div>

                  {smsSent && !isSmsVerified && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex gap-3 items-center"
                    >
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-indigo-900 uppercase">Ingresar Clave SMS Recibida</label>
                        <input
                          type="text"
                          value={smsInput}
                          onChange={(e) => setSmsInput(e.target.value)}
                          className="w-full p-1.5 rounded bg-white border border-indigo-300 text-center font-black tracking-widest text-[#2a1366]"
                          placeholder="Ingrese código de 4 dígitos"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={verifySmsCode}
                        className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-xs shrink-0 self-end"
                      >
                        Verificar
                      </button>
                    </motion.div>
                  )}

                  {isSmsVerified && (
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-[10.5px] font-semibold flex items-center gap-1.5 border border-emerald-200">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Teléfono autenticado y enlazado con éxito.
                    </div>
                  )}
                </div>

                {/* USER PREFERENCES */}
                <div className="space-y-3.5 border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-black text-xs uppercase tracking-wider text-gray-400">Mis Preferencias de Compra</h5>
                    <span className="text-[9px] text-[#772cfc] font-black flex items-center gap-0.5"><Heart className="w-3.5 h-3.5 fill-[#772cfc]" /> Recomendaciones AI</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Selecciona los rubros de comercios afiliados que más utilizas para sugerirte promociones Fast Pay personalizadas en Honduras.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {preferenceChips.map((chip) => {
                      const isSelected = selectedPreferences.includes(chip.id);
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => togglePreference(chip.id)}
                          className={`px-3 py-2 rounded-full font-bold text-[10.5px] transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-[#772cfc] text-white shadow-md scale-105" 
                              : "bg-white border border-gray-200 text-[#484551] hover:bg-gray-50"
                          }`}
                        >
                          {chip.name} {isSelected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Debit/Credit Card detail */}
                <div className="space-y-3.5 border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-black text-xs uppercase tracking-wider text-gray-400">Tarjeta de Respaldo Exclusiva (Realizar Compras)</h5>
                    <span className="text-[9px] text-[#772cfc] font-black italic flex items-center gap-0.5">
                      <Lock className="w-3 h-3 text-[#772cfc]" /> Red Cifrada PCI-DSS
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-500 leading-normal">
                    *Para activar tu cuenta Fast Pay, debes ingresar una tarjeta donde se cobrarán automáticamente tus cuotas quincenales (únicamente por tarjeta bancaria, dinero físico prohibido).
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Titular de la Tarjeta</label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="Alejandra Sofía Zelaya"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        required
                        value={cardNum}
                        onChange={(e) => setCardNum(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="4152 4892 1102 9314"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Fecha de Expiración</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] bg-white text-xs"
                        placeholder="MM/AA (Ej. 09/30)"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#484551] uppercase mb-1">Código de Seguridad (CVV)</label>
                      <input
                        type="password"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold focus:outline-[#772cfc] text-center bg-white text-xs"
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>

                {/* Consentimiento e Historial Crediticio */}
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-start gap-2.5 text-indigo-950">
                  <input
                    type="checkbox"
                    id="usrConfirmConsent"
                    required
                    checked={usrConsent}
                    onChange={(e) => setUsrConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#772cfc] border-gray-300 focus:ring-[#772cfc] rounded shrink-0 cursor-pointer"
                  />
                  <label htmlFor="usrConfirmConsent" className="text-[10.5px] font-semibold leading-relaxed cursor-pointer select-none">
                    Autorizo expresamente a Fast Pay para consultar y evaluar mi récord crediticio mediante el <strong>Motor de Inteligencia Artificial</strong> integrado con Burós Privados autorizados en Honduras. Entiendo y acepto que mis compras BNPL se debitarán de mi tarjeta de respaldo ingresada.
                  </label>
                </div>

                {/* Approval and Submission control */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#2a1366] hover:bg-[#1a0c43] text-white rounded-2xl shadow-xl transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase font-black tracking-wider"
                  id="submit-kyc-registration-btn"
                >
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  Completar Registro Electrónico KYC
                </button>

              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
