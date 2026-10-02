import {
  ChartPie,
  BookOpen,
  Brain,
  Layers,
  BookMarked,
  ListChecks,
  ChartLine,
  Timer,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard & Heatmap",
    icon: ChartPie,
  },
  {
    id: "syllabus",
    label: "Custom Syllabus",
    icon: BookOpen,
  },
  {
    id: "revision",
    label: "Spaced Revision",
    icon: Brain,
  },
  {
    id: "flashcards",
    label: "Formula Deck",
    icon: Layers,
  },
  {
    id: "mistakes",
    label: "Mistake Notebook",
    icon: BookMarked,
  },
  {
    id: "planner",
    label: "Daily Planner",
    icon: ListChecks,
  },
  {
    id: "mocks",
    label: "Mock Test Analytics",
    icon: ChartLine,
  },
  {
    id: "focus",
    label: "Focus Sound Room",
    icon: Timer,
  },
];

function Navigation({ activeTab, setActiveTab ,revisionCount,}) {
  return (
    <nav className="navigation">

      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            className={`nav-item ${
              activeTab === item.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon size={18} />

            <span>{item.label}</span>

           {item.id === "revision" &&
             revisionCount > 0 && (
             <span className="nav-badge">
               {revisionCount}
             </span>
            )}
            
          </button>
        );
      })}

    </nav>
  );
}

export default Navigation;