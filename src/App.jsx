import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Server,
  Code,
  Boxes,
  Zap,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';


// ---------------------------
// Hook responsive
// ---------------------------
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
};


// ---------------------------
// Datos de arquitecturas
// ---------------------------
const architectures = [
  {
    name: 'MVVM',
    fullName: 'Model–View–ViewModel',
    id: 'mvvm-section',
    color: 'text-indigo-400 border-indigo-400',
    icon: LayoutDashboard,
    description:
      'MVVM organiza una aplicación en Model, View y ViewModel. Separa la lógica de negocio de la UI.',
    details: [
      { label: "Tecnologías", value: "Jetpack Compose, Android ViewModel, Vue.js, WPF." },
      { label: "Ventajas", value: "UI reactiva, desacoplamiento, persistencia de estado." },
      { label: "Desventajas", value: "Curva de aprendizaje." },
      { label: "Casos de uso", value: "Apps móviles modernas." }
    ],
    comparison: {
      separacion: 'Muy Alta',
      flexibilidad: 'N/A (Frontend)',
      rendimiento: 'Bueno',
      aprendizaje: 'Media-Alta',
      complejidadBackend: 'N/A'
    }
  },

  {
    name: 'REST',
    fullName: 'Representational State Transfer',
    id: 'rest-section',
    color: 'text-blue-400 border-blue-400',
    icon: Server,
    description:
      'REST es un estilo de arquitectura basado en recursos y operaciones HTTP estándar.',
    details: [
      { label: 'Tecnologías', value: 'Express, Spring Boot, Retrofit, Axios.' },
      { label: 'Ventajas', value: 'Simplicidad, compatibilidad.' },
      { label: 'Desventajas', value: 'Overfetching y underfetching.' },
      { label: 'Casos de uso', value: 'APIs web/móvil.' }
    ],
    comparison: {
      separacion: 'Baja',
      flexibilidad: 'Baja',
      rendimiento: 'Variable',
      aprendizaje: 'Baja',
      complejidadBackend: 'Baja'
    }
  },

  {
    name: 'GraphQL',
    fullName: 'Graph Query Language',
    id: 'graphql-section',
    color: 'text-pink-400 border-pink-400',
    icon: Code,
    description:
      'GraphQL permite al cliente solicitar exactamente los datos que necesita.',
    details: [
      { label: 'Tecnologías', value: 'Apollo, Relay, Graphene.' },
      { label: 'Ventajas', value: 'Evita overfetching, tipado fuerte.' },
      { label: 'Desventajas', value: 'Backend más complejo.' },
      { label: 'Casos de uso', value: 'Redes sociales.' }
    ],
    comparison: {
      separacion: 'Media',
      flexibilidad: 'Muy Alta',
      rendimiento: 'Optimizado',
      aprendizaje: 'Media-Alta',
      complejidadBackend: 'Alta'
    }
  },

  {
    name: 'ECS',
    fullName: 'Entity–Component–System',
    id: 'ecs-section',
    color: 'text-green-400 border-green-400',
    icon: Boxes,
    description:
      'ECS es una arquitectura orientada a datos para videojuegos con rendimiento extremo.',
    details: [
      { label: 'Tecnologías', value: 'Unity ECS, Godot ECS, EnTT, Flecs.' },
      { label: 'Ventajas', value: 'Máximo rendimiento, paralelismo.' },
      { label: 'Desventajas', value: 'Muy difícil de aprender.' },
      { label: 'Casos de uso', value: 'Juegos AAA, simulaciones.' }
    ],
    comparison: {
      separacion: 'Alta',
      flexibilidad: 'Alta',
      rendimiento: 'Extremo',
      aprendizaje: 'Muy Alta',
      complejidadBackend: 'N/A'
    }
  }
];


// ---------------------------
// Sidebar
// ---------------------------
const Sidebar = ({ isOpen, toggle, sections, isMobile }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (isMobile) toggle();
    }
  };

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-30"
          onClick={toggle}
        />
      )}

      <nav
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-xl z-40 p-6
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-64 md:bg-gray-900
        `}
      >
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h3 className="text-xl font-bold text-white">Navegación</h3>
          <button onClick={toggle} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-600 hover:text-white transition"
              >
                <section.icon className={`w-5 h-5 mr-3 ${section.color}`} />
                {section.name}
              </button>
            </li>
          ))}
          <li className="pt-4 border-t border-gray-700">
            <button
              onClick={() => scrollToSection("comparativa-section")}
              className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-purple-600 hover:text-white transition"
            >
              <Zap className="w-5 h-5 mr-3 text-purple-400" />
              Comparativa
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};


// ---------------------------
// Card de Arquitectura
// ---------------------------
const ArchitectureCard = ({ arch }) => {
  const [open, setOpen] = useState(false);
  const Icon = arch.icon;

  return (
    <div
      id={arch.id}
      className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:bg-gray-700/40 transition cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-extrabold ${arch.color}`}>
          {arch.name} ({arch.fullName})
        </h2>
        <Icon className={`w-8 h-8 ${arch.color}`} />
      </div>

      <p className="text-gray-400 mb-4">{arch.description}</p>

      <button className={`w-full py-2 border rounded-lg ${arch.color} text-sm`}>
        {open ? (
          <>Ver menos <ChevronUp className="w-4 h-4 inline ml-2" /></>
        ) : (
          <>Ver detalles <ChevronDown className="w-4 h-4 inline ml-2" /></>
        )}
      </button>

      {open && (
        <div className="mt-4 border-t border-gray-700 pt-4 animate-fadeIn space-y-2">
          {arch.details.map((d, i) => (
            <div key={i} className="text-gray-300 text-sm">
              <b>{d.label}: </b>
              <span className="text-gray-400">{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// ---------------------------
// App principal
// ---------------------------
const App = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [highlightCriterion, setHighlightCriterion] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const criteria = {
    separacion: "Separación UI/Lógica",
    flexibilidad: "Flexibilidad",
    rendimiento: "Rendimiento",
    aprendizaje: "Aprendizaje",
    complejidadBackend: "Complejidad Back"
  };

  const columns = architectures.map(a => a.name);

  const cellClass = (criterion, archName) => {
    if (highlightCriterion !== criterion) return "text-gray-400";

    const value = architectures.find(a => a.name === archName).comparison[criterion];
    let base = "font-semibold ring-2 text-gray-300";

    if (["Extremo", "Optimizado"].some(k => value.includes(k)))
      return `${base} ring-green-500 bg-green-900/40 text-green-300`;

    if (value.includes("Muy Alta"))
      return `${base} ring-purple-500 bg-purple-900/40 text-purple-300`;

    if (value.includes("Baja"))
      return `${base} ring-yellow-500 bg-yellow-900/40 text-yellow-300`;

    return base;
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="sticky top-0 bg-gray-800 border-b border-gray-700 shadow px-4 py-4 z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-xl font-extrabold">
            <span className="text-indigo-400">ARCH</span> Comparison
          </h1>

          {isMobile && (
            <button onClick={toggleSidebar} className="p-2 text-indigo-400">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          toggle={toggleSidebar}
          sections={architectures}
          isMobile={isMobile}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* INTRO */}
            <section id="intro" className="bg-gray-800 p-6 rounded-xl border-l-4 border-purple-500">
              <h2 className="text-3xl font-bold flex items-center mb-4">
                <BookOpen className="w-6 h-6 mr-2 text-purple-400" /> Introducción
              </h2>
              <p className="text-gray-400">
                Esta página compara MVVM, REST, GraphQL y ECS mostrando sus ventajas,
                desventajas y características principales.
              </p>
            </section>

            {/* CARDS */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Arquitecturas</h2>
              <div className="grid grid-cols-1 gap-8">
                {architectures.map(a => (
                  <ArchitectureCard key={a.name} arch={a} />
                ))}
              </div>
            </section>

            {/* COMPARATIVA */}
            <section id="comparativa-section" className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-500">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-400" /> Comparativa Final
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="p-3 text-left">Criterio</th>
                      {columns.map(c => (
                        <th key={c} className="p-3 text-center">{c}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700">
                    {Object.keys(criteria).map(criterion => (
                      <tr
                        key={criterion}
                        className="hover:bg-gray-700/50 cursor-pointer"
                        onClick={() => setHighlightCriterion(
                          highlightCriterion === criterion ? null : criterion
                        )}
                      >
                        <td className="p-3 font-bold text-indigo-300">{criteria[criterion]}</td>

                        {columns.map(name => (
                          <td
                            key={name}
                            className={`p-3 text-center ${cellClass(criterion, name)}`}
                          >
                            {architectures.find(a => a.name === name).comparison[criterion]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </main>
      </div>

      <footer className="py-6 text-center text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} Arquitecturas Modernas — React + Tailwind
      </footer>
    </div>
  );
};

export default App;

