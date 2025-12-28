import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  Brain,
  ChevronRight,
  BookOpen,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  X,
  LogOut,
  Volume2,
  Layout,
  Moon,
  Sun,
  Flame,
  Calendar,
  AlertTriangle,
  Download,
  Share2,
  HelpCircle,
  MousePointer,
  Subtitles,
  Award,
  MicOff,
} from "lucide-react";

// --- UTILIDADES ---
const cardStyle =
  "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300";
const badgeStyle =
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

// --- CONFETI (Efecto Visual) ---
const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex justify-center">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute top-0 animate-[fall_3s_ease-in-out_forwards]"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 1.5}s`,
          backgroundColor: ["#FFD700", "#FF6347", "#32CD32", "#1E90FF"][
            Math.floor(Math.random() * 4)
          ],
          width: "10px",
          height: "20px",
          opacity: 0.8,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    ))}
    <div className="absolute top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-8 py-4 rounded-2xl shadow-2xl border-4 border-green-500 animate-bounce">
      <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2">
        <Award size={32} /> ¡Correcto!
      </h2>
    </div>
    <style>{`
      @keyframes fall {
        0% { top: -10%; transform: rotate(0deg) translateX(0); }
        100% { top: 110%; transform: rotate(720deg) translateX(20px); }
      }
    `}</style>
  </div>
);

// --- COMPONENTE AVATAR ---
const TeacherAvatar = ({ state }) => {
  const getStateStyles = () => {
    switch (state) {
      case "listening":
        return {
          border: "border-red-500",
          ring: "ring-red-500/20",
          text: "text-red-600 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-900/20",
          label: "Escuchando...",
        };
      case "thinking":
        return {
          border: "border-amber-400",
          ring: "ring-amber-400/20",
          text: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-50 dark:bg-amber-900/20",
          label: "Pensando...",
        };
      case "speaking":
        return {
          border: "border-emerald-500",
          ring: "ring-emerald-500/20",
          text: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          label: "Hablando",
        };
      default:
        return {
          border: "border-transparent",
          ring: "ring-transparent",
          text: "text-slate-500 dark:text-slate-400",
          bg: "bg-slate-100 dark:bg-slate-700",
          label: "En línea",
        };
    }
  };

  const styles = getStateStyles();

  return (
    <div
      className={`${cardStyle} p-6 flex flex-col items-center justify-center h-full relative overflow-hidden transition-colors`}
    >
      <div
        className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full transition-all duration-300 border-4 ${styles.border} ring-4 ${styles.ring}`}
      >
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Profesora Virtual"
          className="w-full h-full object-cover rounded-full"
        />
        {state === "speaking" && (
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse" />
        )}
      </div>

      <div className="mt-5 text-center w-full">
        <h3 className="font-bold text-slate-800 dark:text-white text-lg">
          Ana
        </h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide mb-3">
          Matemáticas
        </p>

        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-transparent transition-colors duration-300 ${styles.bg} ${styles.text}`}
        >
          {state === "listening" && <Mic size={14} className="animate-pulse" />}
          {state === "thinking" && (
            <Brain size={14} className="animate-bounce" />
          )}
          {state === "speaking" && <Volume2 size={14} />}
          {state === "idle" && (
            <span className="w-2 h-2 rounded-full bg-slate-400" />
          )}
          <span className="text-sm font-semibold">{styles.label}</span>
        </div>
      </div>
    </div>
  );
};

// --- LOGICA DE INTELIGENCIA ARTIFICIAL SIMULADA ---
const simulateAIResponse = (userText) => {
  const lowerText = userText ? userText.toLowerCase() : "";

  if (
    lowerText.includes("hipotenusa") ||
    lowerText.includes("lado c") ||
    lowerText.includes("cinco") ||
    lowerText.includes("5")
  ) {
    return {
      text: "¡Exacto, Álex! Has identificado que es la hipotenusa. Si aplicamos la fórmula, la raíz cuadrada de 25 es 5. ¡Gran trabajo!",
      action: "confetti",
    };
  }

  if (
    lowerText.includes("no entiendo") ||
    lowerText.includes("ayuda") ||
    lowerText.includes("explicar") ||
    lowerText.includes("repetir")
  ) {
    return {
      text: "No te preocupes. Imagina que el triángulo es como una rampa. El lado A es la altura y el lado B es el suelo. Queremos saber cuánto mide la rampa.",
      action: "explain",
    };
  }

  if (lowerText.includes("hola") || lowerText.includes("buenos días")) {
    return {
      text: "¡Hola Álex! Me alegro de verte. Hoy estamos viendo el Teorema de Pitágoras. ¿Recuerdas la fórmula?",
      action: "greet",
    };
  }

  if (lowerText.includes("fórmula") || lowerText.includes("teorema")) {
    return {
      text: "La fórmula mágica es: A al cuadrado más B al cuadrado es igual a C al cuadrado. ¿Quieres intentar calcularlo?",
      action: "hint",
    };
  }

  // Respuesta por defecto
  return {
    text:
      "Te he escuchado decir: " +
      userText +
      ". ¿Podrías relacionarlo con la longitud del triángulo?",
    action: "default",
  };
};

// --- COMPONENTES DE PÁGINAS ---

const HomePage = ({ onNavigate, darkMode, toggleDarkMode }) => (
  <div className="min-h-screen font-sans flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            AulaIA
          </span>
        </div>
        <div className="flex gap-6 items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => onNavigate("student")}
            className="bg-slate-900 dark:bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all font-medium text-sm shadow-sm hover:shadow"
          >
            Entrar como Alumno
          </button>
        </div>
      </div>
    </nav>
    <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">
        Clases particulares con{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          interacción real.
        </span>
      </h1>
      <button
        onClick={() => onNavigate("student")}
        className="group bg-blue-600 text-white text-lg px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg flex items-center gap-3"
      >
        Probar clase interactiva{" "}
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </main>
  </div>
);

const StudentDashboard = ({ onNavigate }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 md:p-10 font-sans transition-colors">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Hola, Álex 👋
      </h1>
      <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm p-8 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-6">
          RECOMENDADO
        </span>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Matemáticas: Pitágoras
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Entra y prueba a decir "No entiendo" o "Es la hipotenusa".
        </p>
        <button
          onClick={() => onNavigate("classroom")}
          className="inline-flex items-center gap-2 text-white bg-blue-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors"
        >
          Entrar a clase <ChevronRight size={18} />
        </button>
      </div>
    </div>
  </div>
);

const ParentDashboard = ({ onNavigate }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8 font-sans transition-colors">
    <div className="max-w-5xl mx-auto">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Portal de Padres
        </h1>
        <button
          onClick={() => onNavigate("home")}
          className="text-sm text-slate-500"
        >
          Salir
        </button>
      </nav>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">
          Aquí se mostrarían las métricas detalladas.
        </p>
      </div>
    </div>
  </div>
);

const Classroom = ({ onNavigate }) => {
  const [micState, setMicState] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [lastUserText, setLastUserText] = useState("");
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [laserPoint, setLaserPoint] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [browserSupport, setBrowserSupport] = useState(true);

  const whiteboardRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Comprobar soporte del navegador para SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setBrowserSupport(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "es-ES";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setMicState("listening");
      setTranscript("Escuchando...");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setLastUserText(text);
      setTranscript(`"${text}"`);
      handleAIProcessing(text);
    };

    recognition.onerror = (event) => {
      console.error("Error speech:", event.error);
      setMicState("idle");
      setTranscript("No te he oído bien. Prueba otra vez.");
    };

    recognition.onend = () => {
      // La lógica de estado se maneja en onresult/onerror
    };

    recognitionRef.current = recognition;

    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleAIProcessing = (userText) => {
    setMicState("thinking");

    setTimeout(() => {
      const aiResponse = simulateAIResponse(userText);

      setMicState("speaking");
      setTranscript(aiResponse.text);

      if (aiResponse.action === "confetti") setShowConfetti(true);

      speakText(aiResponse.text, () => {
        setMicState("idle");
        setTranscript("");
        setShowConfetti(false);
      });
    }, 1500);
  };

  const speakText = (text, onEndCallback) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) => v.lang.includes("es") && v.name.includes("Google")
      );
      if (spanishVoice) utterance.voice = spanishVoice;

      utterance.onend = () => {
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(onEndCallback, 3000);
    }
  };

  const handleMicClick = () => {
    if (!browserSupport) {
      alert(
        "Tu navegador no soporta reconocimiento de voz. Usa Chrome en PC o Android."
      );
      return;
    }

    if (micState === "idle") {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.log("Recognition error start", e);
      }
    } else {
      recognitionRef.current.stop();
    }
  };

  const handleWhiteboardClick = (e) => {
    if (!whiteboardRef.current) return;
    const rect = whiteboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLaserPoint({ x, y });
    setTimeout(() => setLaserPoint(null), 1000);
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-900 flex flex-col font-sans overflow-hidden transition-colors">
      {showConfetti && <Confetti />}

      <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center px-6 shrink-0 z-20 shadow-sm transition-colors">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("student")}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X size={24} />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              Matemáticas: Pitágoras
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Ejercicio 3 de 5
            </p>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-mono font-medium flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          EN VIVO
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row p-4 md:p-6 gap-6 overflow-hidden max-w-[1600px] mx-auto w-full relative">
        {/* ZONA A: Profesor */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-4 h-[30vh] md:h-auto">
          <TeacherAvatar state={micState} />
          <div className="hidden md:flex flex-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex-col shadow-sm transition-colors">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Diálogo en curso
            </h4>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {lastUserText && (
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none border border-slate-100 dark:border-slate-600 animate-in fade-in">
                  <p className="text-xs text-slate-400 mb-1">Tú dijiste:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-medium italic">
                    "{lastUserText}"
                  </p>
                </div>
              )}
              {(micState === "speaking" ||
                (micState === "listening" && !lastUserText)) && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg rounded-tr-none border border-blue-100 dark:border-blue-800 ml-auto animate-in slide-in-from-bottom-2 fade-in">
                  <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                    {transcript || "..."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ZONA B: Pizarra */}
        <div
          ref={whiteboardRef}
          onClick={handleWhiteboardClick}
          className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden flex flex-col cursor-crosshair transition-colors"
        >
          {laserPoint && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_4px_rgba(239,68,68,0.6)] animate-ping pointer-events-none"
              style={{
                left: laserPoint.x,
                top: laserPoint.y,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}

          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="bg-white/90 dark:bg-slate-700/90 backdrop-blur border border-slate-200 dark:border-slate-600 px-3 py-1 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-300 shadow-sm pointer-events-none">
              PIZARRA
            </div>
          </div>

          {/* Subtítulos */}
          {showSubtitles && (micState === "speaking" || transcript) && (
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center px-8 pointer-events-none">
              <div className="bg-black/70 text-white px-6 py-3 rounded-xl text-lg font-medium shadow-lg backdrop-blur text-center max-w-2xl animate-in fade-in slide-in-from-bottom-2">
                {transcript}
              </div>
            </div>
          )}

          <div className="flex-1 flex items-center justify-center p-8 relative z-0">
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full max-w-3xl drop-shadow-lg filter"
            >
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path
                    d="M0,0 L0,6 L9,3 z"
                    className="fill-slate-700 dark:fill-slate-300"
                  />
                </marker>
              </defs>
              <path
                d="M50,250 L250,250 L50,50 Z"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M50,220 L80,220 L80,250"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              <text
                x="20"
                y="150"
                className="text-xl font-sans font-medium fill-slate-600 dark:fill-slate-300"
              >
                a = 3
              </text>
              <text
                x="140"
                y="280"
                className="text-xl font-sans font-medium fill-slate-600 dark:fill-slate-300"
              >
                b = 4
              </text>
              <text
                x="160"
                y="130"
                className="text-xl font-sans font-bold fill-red-500"
              >
                c = ?
              </text>
              <g transform="translate(280, 80)">
                <text y="0" className="text-lg font-mono fill-slate-400">
                  a² + b² = c²
                </text>
                <text
                  y="35"
                  className="text-lg font-mono fill-slate-800 dark:fill-white font-medium"
                >
                  3² + 4² = c²
                </text>
                <text
                  y="70"
                  className="text-lg font-mono fill-slate-800 dark:fill-white font-medium"
                >
                  9 + 16 = c²
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="h-28 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center relative shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-30 transition-colors">
        <div className="absolute left-8 hidden md:flex items-center gap-4">
          <button
            onClick={() => setShowSubtitles(!showSubtitles)}
            className={`p-3 rounded-full border transition-colors ${
              showSubtitles
                ? "bg-blue-100 border-blue-200 text-blue-600 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-300"
                : "bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-700 dark:border-slate-600"
            }`}
            title="Activar Subtítulos"
          >
            <Subtitles size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() =>
              handleAIProcessing("No entiendo, explícame de nuevo")
            }
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700">
              <HelpCircle size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide">
              No entiendo
            </span>
          </button>

          <button
            onClick={handleMicClick}
            className={`
              relative group flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 transform shadow-xl
              ${
                micState === "idle"
                  ? "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-blue-600/30"
                  : ""
              }
              ${
                micState === "listening"
                  ? "bg-red-500 scale-110 shadow-red-500/40"
                  : ""
              }
              ${
                micState === "thinking"
                  ? "bg-amber-400 scale-100 shadow-amber-400/40 cursor-wait"
                  : ""
              }
              ${
                micState === "speaking"
                  ? "bg-emerald-500 scale-100 shadow-emerald-500/40 cursor-default"
                  : ""
              }
            `}
          >
            {micState === "listening" && (
              <span className="absolute w-full h-full rounded-full border-4 border-red-500 opacity-50 animate-ping"></span>
            )}
            <div className="relative z-10 text-white">
              {micState === "idle" && <Mic size={32} />}
              {micState === "listening" && <Mic size={32} />}
              {micState === "thinking" && (
                <Brain size={32} className="animate-pulse" />
              )}
              {micState === "speaking" && <Volume2 size={32} />}
            </div>

            <div className="absolute -bottom-8 font-bold text-xs tracking-widest uppercase text-slate-400 dark:text-slate-500 select-none whitespace-nowrap">
              {micState === "idle"
                ? browserSupport
                  ? "PULSAR"
                  : "NO SOPORTADO"
                : micState === "listening"
                ? "TE ESCUCHO..."
                : micState === "thinking"
                ? "PENSANDO..."
                : "HABLANDO"}
            </div>
          </button>
          <div className="w-12"></div>
        </div>
      </div>
    </div>
  );
};

// --- APP ROOT ---
const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomePage
            onNavigate={setCurrentView}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );
      case "student":
        return (
          <StudentDashboard onNavigate={setCurrentView} darkMode={darkMode} />
        );
      case "parent":
        return (
          <ParentDashboard onNavigate={setCurrentView} darkMode={darkMode} />
        );
      case "classroom":
        return <Classroom onNavigate={setCurrentView} />;
      default:
        return (
          <HomePage
            onNavigate={setCurrentView}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );
    }
  };

  return <div className={`${darkMode ? "dark" : ""}`}>{renderView()}</div>;
};

export default App;
