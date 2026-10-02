// import {
//   Settings,
//   Download,
//   Upload,
//   RotateCcw,
// } from "lucide-react";

// function Header({ branch, setBranch ,setModalType,}) {
//   return (
//     <header className="app-header">
//       <div className="header-left">
//         <div className="logo">
//           <div className="logo-icon">GQ</div>

//           <div>
//             <h1>GATE Quest</h1>
//             <span>PRO v3</span>
//           </div>
//         </div>
//       </div>

//       <div className="header-actions">

//         {/* Branch Selector */}
//         <select
//           className="branch-select"
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//         >
//           <option value="CS">CSE / IT</option>
//           <option value="ECE">ECE</option>
//           <option value="EE">Electrical</option>
//           <option value="ME">Mechanical</option>
//           <option value="CE">Civil</option>
//         </select>

//         {/* <button className="header-btn">
//           <Settings size={17} />
//           Adjust Plan
//         </button> */}
//         <button
//           className="header-btn"
//           onClick={() =>
//               setModalType("settings")
//            }
//          >
//           <Settings size={17} />
//            Adjust Plan
//           </button>

//         <button className="header-btn">
//           <Download size={17} />
//           Export JSON
//         </button>

//         <button className="header-btn">
//           <Upload size={17} />
//           Import JSON
//         </button>

//         <button className="header-btn danger">
//           <RotateCcw size={17} />
//           Hard Reset
//         </button>

//       </div>
//     </header>
//   );
// }

// export default Header;

//-------------------------------------------
import { useState } from "react";

import {
  Settings,
  Download,
  Upload,
  RotateCcw,
   ChevronDown,
  User,
  LogOut,
  //LogOut,
} from "lucide-react";

import {
  exportBackup,
  importBackup,
  hardReset,
} from "../../utils/backup";

import { useAuth } from "../../context/AuthContext";

function Header({
  user,
  branch,
  setBranch,
  setModalType,
  
}) {

    const { logout } = useAuth();

    const [profileOpen, setProfileOpen] = useState(false);
  // --------------------------------
  // Export
  // --------------------------------

  const handleExport = () => {
    try {
      exportBackup();

      alert(
        "GATE Quest Pro backup exported successfully."
      );
    } catch (error) {
      console.error(
        "Export failed:",
        error
      );

      alert(
        "Failed to export backup."
      );
    }
  };


  // --------------------------------
  // Import
  // --------------------------------

  const handleImport = () => {

    const input =
      document.createElement(
        "input"
      );

    input.type = "file";

    input.accept =
      "application/json,.json";

    input.onchange = async (
      event
    ) => {

      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      const confirmed =
        window.confirm(
          "Importing a backup will replace your current GATE Quest Pro data. Continue?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await importBackup(file);

        alert(
          "Backup imported successfully. The application will reload."
        );

        window.location.reload();

      } catch (error) {

        console.error(
          "Import failed:",
          error
        );

        alert(
          error.message ||
            "Failed to import backup."
        );
      }
    };

    input.click();
  };


  // --------------------------------
  // Hard Reset
  // --------------------------------

  const handleHardReset = () => {

    const confirmed =
      window.confirm(
        "WARNING: This will permanently delete all GATE Quest Pro data from this browser. Continue?"
      );

    if (!confirmed) {
      return;
    }

    const secondConfirmation =
      window.confirm(
        "Are you absolutely sure? Export a backup first if you need your data later."
      );

    if (!secondConfirmation) {
      return;
    }

    hardReset();
  };


    const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    logout();
  };

  return (
    <header className="app-header">

      {/* Logo */}

      <div className="header-left">

        <div className="logo">

          <div className="logo-icon">
            GQ
          </div>

          <div>
            <h1>
              GATE Quest
            </h1>

            <span>
              PRO v3
            </span>
          </div>

        </div>

      </div>


      {/* Header Actions */}

      <div className="header-actions">

        {/* Branch */}

        <select
          className="branch-select"
          value={branch}
          onChange={(event) =>
            setBranch(
              event.target.value
            )
          }
        >
          <option value="CS">
            CSE / IT
          </option>

          <option value="ECE">
            ECE
          </option>

          <option value="EE">
            Electrical
          </option>

          <option value="ME">
            Mechanical
          </option>

          <option value="CE">
            Civil
          </option>
        </select>



        {/* Adjust Plan */}

        <button
          className="header-btn"
          onClick={() =>
            setModalType(
              "settings"
            )
          }
        >
          <Settings size={17} />

          Adjust Plan
        </button>


        {/* Export */}

        <button
          className="header-btn"
          onClick={
            handleExport
          }
        >
          <Download size={17} />

          Export JSON
        </button>


        {/* Import */}

        <button
          className="header-btn"
          onClick={
            handleImport
          }
        >
          <Upload size={17} />

          Import JSON
        </button>


        {/* Hard Reset */}

        <button
          className="header-btn danger"
          onClick={
            handleHardReset
          }
        >
          <RotateCcw size={17} />

          Hard Reset
        </button>





        {/* User Profile */}

<div className="header-profile">

  <button
    type="button"
    className="header-profile-button"
    onClick={() => setProfileOpen((prev) => !prev)}
    aria-expanded={profileOpen}
  >

    <div className="header-profile-avatar">
      {user?.name
        ? user.name.charAt(0).toUpperCase()
        : "U"}
    </div>

    <div className="header-profile-info">

      <span className="header-profile-name">
        {user?.name || "User"}
      </span>

      <span className="header-profile-branch">
        <span className="header-online-dot" />
        {branch === "CS"
          ? "CSE / IT"
          : branch}
      </span>

    </div>

    <ChevronDown
      size={15}
      className={`header-profile-chevron ${
        profileOpen ? "open" : ""
      }`}
    />

  </button>


  {/* Dropdown */}

  {profileOpen && (
    <div className="header-profile-dropdown">

      <div className="header-profile-dropdown-top">

        <div className="header-profile-large-avatar">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="header-profile-dropdown-info">

          <strong>
            {user?.name || "User"}
          </strong>

          <span>
            {user?.email || "No email available"}
          </span>

        </div>

      </div>


      <div className="header-profile-dropdown-divider" />


      <div className="header-profile-account">

        <User size={15} />

        <div>
          <span>Account</span>
          <small>Logged in user</small>
        </div>

      </div>


      <div className="header-profile-branch-row">

        <span>Branch</span>

        <strong>
          {branch === "CS"
            ? "CSE / IT"
            : branch}
        </strong>

      </div>


      <div className="header-profile-dropdown-divider" />


      <button
        type="button"
        className="header-profile-logout"
        onClick={handleLogout}
      >
        <LogOut size={15} />

        <span>Logout</span>
      </button>

    </div>
  )}

</div>


        {/* Logged-in User */}
{/* 
<div className="header-user">

  <div className="header-user-avatar">
    {user?.name
      ? user.name.charAt(0).toUpperCase()
      : "U"}
  </div>

  <div className="header-user-info">

    <span className="header-user-name">
      {user?.name || "User"}
    </span>

    <span className="header-user-email">
      {user?.email || "Logged in"}
    </span>

  </div>

</div> */}

                {/* Logout */}
{/* 
        <button
          className="header-btn"
          onClick={handleLogout}
        >
         

          Logout
        </button> */}

      </div>

    </header>
  );
}

export default Header;
