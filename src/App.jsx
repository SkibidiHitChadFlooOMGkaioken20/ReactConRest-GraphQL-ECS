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
import './App.css'; // Importamos el archivo CSS

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
// Datos de arquitecturas (Sin cambios)
// ---------------------------
const architectures = [
  {
    name: 'MVVM',
    fullName: 'Model–View–ViewModel',
    id: 'mvvm-section',
    color: 'color-indigo', // Clase CSS
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
    color: 'color-blue', // Clase CSS
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
    color: 'color-pink', // Clase CSS
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
    color: 'color-green', // Clase CSS
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
          className="sidebar-backdrop"
          onClick={toggle}
        />
      )}

      <nav
        className={`
          sidebar
          ${isOpen ? "sidebar-open" : "sidebar-closed"}
          ${isMobile ? "sidebar-mobile" : "sidebar-desktop"}
        `}
      >
        <div className="sidebar-header-mobile">
          <h3 className="sidebar-title">Navegación</h3>
          <button onClick={toggle} className="sidebar-close-btn">
            <X size={24} />
          </button>
        </div>

        <ul className="sidebar-nav-list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="sidebar-link"
              >
                <section.icon className={`sidebar-icon ${section.color}`} />
                {section.name}
              </button>
            </li>
          ))}
          <li className="sidebar-divider"></li>
          <li>
            <button
              onClick={() => scrollToSection("comparativa-section")}
              className="sidebar-link sidebar-link-comparison"
            >
              <Zap className="sidebar-icon color-purple" />
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
      className="card"
      onClick={() => setOpen(!open)}
    >
      <div className="card-header">
        <h2 className={`card-title ${arch.color}`}>
          {arch.name} ({arch.fullName})
        </h2>
        <Icon className={`card-icon ${arch.color}`} />
      </div>

      <p className="card-description">{arch.description}</p>

      <button className={`card-toggle-btn ${arch.color}`}>
        {open ? (
          <>Ver menos <ChevronUp className="icon-inline" /></>
        ) : (
          <>Ver detalles <ChevronDown className="icon-inline" /></>
        )}
      </button>

      {open && (
        <div className="card-details-container">
          {arch.details.map((d, i) => (
            <div key={i} className="card-detail-item">
              <b>{d.label}: </b>
              <span className="card-detail-value">{d.value}</span>
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
    if (highlightCriterion !== criterion) return "table-cell-default";

    const value = architectures.find(a => a.name === archName).comparison[criterion];
    let base = "table-cell-highlight";

    if (["Extremo", "Optimizado"].some(k => value.includes(k)))
      return `${base} table-cell-positive`;

    if (value.includes("Muy Alta"))
      return `${base} table-cell-high`;

    if (value.includes("Baja"))
      return `${base} table-cell-negative`;

    return base;
  };


  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <span className="text-indigo-400">ARCH</span> Comparison
          </h1>

          {isMobile && (
            <button onClick={toggleSidebar} className="menu-btn">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </header>

      <div className="main-layout">
        <Sidebar
          isOpen={sidebarOpen}
          toggle={toggleSidebar}
          sections={architectures}
          isMobile={isMobile}
        />

        <main className="main-content">
          <div className="content-inner">

            {/* INTRO */}
            <section id="intro" className="section-intro">
              <h2 className="section-title">
                <BookOpen className="icon-title color-purple" /> Introducción
              </h2>
              <p className="section-text">
                Esta página compara MVVM, REST, GraphQL y ECS mostrando sus ventajas,
                desventajas y características principales.
              </p>
            </section>

            {/* CARDS */}
            <section>
              <h2 className="section-title-large">Arquitecturas</h2>
              <div className="card-grid">
                {architectures.map(a => (
                  <ArchitectureCard key={a.name} arch={a} />
                ))}
              </div>
            </section>

            {/* COMPARATIVA */}
            <section id="comparativa-section" className="section-comparison">
              <h2 className="section-title">
                <Zap className="icon-title color-yellow" /> Comparativa Final
              </h2>

              <div className="table-responsive">
                <table className="comparison-table">
                  <thead className="table-header">
                    <tr>
                      <th className="table-cell table-cell-header-criterion">Criterio</th>
                      {columns.map(c => (
                        <th key={c} className="table-cell table-cell-header-arch">{c}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="table-body">
                    {Object.keys(criteria).map(criterion => (
                      <tr
                        key={criterion}
                        className="table-row-hover"
                        onClick={() => setHighlightCriterion(
                          highlightCriterion === criterion ? null : criterion
                        )}
                      >
                        <td className="table-cell table-cell-criterion">{criteria[criterion]}</td>

                        {columns.map(name => (
                          <td
                            key={name}
                            className={`table-cell table-cell-comparison ${cellClass(criterion, name)}`}
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

      <footer className="footer">
        © {new Date().getFullYear()} Arquitecturas Modernas — React + CSS Puro
      </footer>
    </div>
  );
};

export default App;

