// function Footer() {
//   return (
//     <footer className="w-full border-t border-slate-800 bg-[#05091a] px-4 py-8 text-slate-300 md:px-6">
//       <div className="mx-auto w-full max-w-7xl">

//         {/* Main Footer Section */}
//         <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

//           {/* Brand */}
//           <div>
//             <h2 className="text-xl font-bold text-white">
//               GATE QUEST PRO
//             </h2>

//             <p className="mt-1 text-sm text-slate-400">
//               Your smart companion for GATE preparation.
//             </p>
//           </div>

//           {/* Footer Navigation */}
//           <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
//             <button
//               type="button"
//               className="text-slate-300 transition-colors duration-200 hover:text-blue-400"
//             >
//               Dashboard
//             </button>

//             <button
//               type="button"
//               className="text-slate-300 transition-colors duration-200 hover:text-blue-400"
//             >
//               Syllabus
//             </button>

//             <button
//               type="button"
//               className="text-slate-300 transition-colors duration-200 hover:text-blue-400"
//             >
//               Planner
//             </button>

//             <button
//               type="button"
//               className="text-slate-300 transition-colors duration-200 hover:text-blue-400"
//             >
//               Mock Tests
//             </button>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-6 border-t border-slate-800" />

//         {/* Bottom Footer Section */}
//         <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

//           <p>
//             © {new Date().getFullYear()} GATE QUEST PRO. All rights reserved.
//           </p>

//           <p>
//             Built with{" "}
//             <span className="text-pink-500" aria-label="love">
//               ♥
//             </span>{" "}
//             for GATE aspirants.
//           </p>

//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import {
  ArrowUp,
  BookOpen,
  CalendarDays,
  CheckSquare,
  Heart,
  LayoutDashboard,
} from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="app-footer">
      <div className="app-footer-container">

        {/* ========================================
            FOOTER MAIN
        ======================================== */}

        <div className="app-footer-main">

          {/* Brand Section */}
          <div className="app-footer-brand">

            <div className="app-footer-brand-row">

              <div className="app-footer-logo">
                GQ
              </div>

              <div>
                <h2 className="app-footer-brand-name">
                  GATE QUEST
                </h2>

                <span className="app-footer-version">
                  PRO v3
                </span>
              </div>

            </div>

            <p className="app-footer-description">
              Your focused study workspace for planning, practicing,
              revising, and tracking your GATE preparation.
            </p>

            <div className="app-footer-status">
              <span className="app-footer-status-dot" />
              <span>
                Your study workspace is ready
              </span>
            </div>

          </div>


          {/* Navigation Section */}
          <div className="app-footer-navigation">

            <p className="app-footer-section-title">
              QUICK NAVIGATION
            </p>

            <div className="app-footer-nav-grid">

              {/* Dashboard */}
              <button
                type="button"
                className="app-footer-nav-card"
              >
                <span className="app-footer-nav-icon dashboard">
                  <LayoutDashboard size={17} />
                </span>

                <span className="app-footer-nav-content">
                  <strong>Dashboard</strong>
                  <small>Overview & progress</small>
                </span>
              </button>


              {/* Syllabus */}
              <button
                type="button"
                className="app-footer-nav-card"
              >
                <span className="app-footer-nav-icon syllabus">
                  <BookOpen size={17} />
                </span>

                <span className="app-footer-nav-content">
                  <strong>Syllabus</strong>
                  <small>Track your subjects</small>
                </span>
              </button>


              {/* Planner */}
              <button
                type="button"
                className="app-footer-nav-card"
              >
                <span className="app-footer-nav-icon planner">
                  <CalendarDays size={17} />
                </span>

                <span className="app-footer-nav-content">
                  <strong>Planner</strong>
                  <small>Manage your tasks</small>
                </span>
              </button>


              {/* Mock Tests */}
              <button
                type="button"
                className="app-footer-nav-card"
              >
                <span className="app-footer-nav-icon mocks">
                  <CheckSquare size={17} />
                </span>

                <span className="app-footer-nav-content">
                  <strong>Mock Tests</strong>
                  <small>Practice & analytics</small>
                </span>
              </button>

            </div>
          </div>

        </div>


        {/* ========================================
            DIVIDER
        ======================================== */}

        <div className="app-footer-divider" />


        {/* ========================================
            FOOTER BOTTOM
        ======================================== */}

        <div className="app-footer-bottom">

          <p className="app-footer-copyright">
            © {new Date().getFullYear()}{" "}
            <span>GATE QUEST PRO</span>
            {" "}• All rights reserved.
          </p>


          <p className="app-footer-made">
            Built with
            <Heart
              size={13}
              className="app-footer-heart"
            />
            for GATE aspirants
          </p>


          <button
            type="button"
            className="app-footer-top-button"
            onClick={scrollToTop}
          >
            <ArrowUp size={14} />
            Back to top
          </button>

        </div>

      </div>


      {/* ========================================
          FOOTER TAGLINE
      ======================================== */}

      <div className="app-footer-tagline">
        <span>Stay consistent.</span>
        <span>Keep progressing.</span>
      </div>

    </footer>
  );
}

export default Footer;