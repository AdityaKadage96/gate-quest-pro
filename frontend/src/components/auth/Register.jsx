// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// const Register = ({ onBackToLogin }) => {
//   const { register, loading } = useAuth();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [branch, setBranch] = useState("CS");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     if (
//       !name.trim() ||
//       !email.trim() ||
//       !password.trim() ||
//       !branch
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       await register({
//         name: name.trim(),
//         email: email.trim(),
//         password,
//         branch,
//       });

//       setSuccess("Registration successful.");
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Registration failed. Please try again.";

//       setError(message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900">
//             GATE Quest Pro
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Create your account
//           </p>
//         </div>

//         {error && (
//           <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label
//               htmlFor="name"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>

//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(event) =>
//                 setName(event.target.value)
//               }
//               placeholder="Enter your name"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="register-email"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>

//             <input
//               id="register-email"
//               type="email"
//               value={email}
//               onChange={(event) =>
//                 setEmail(event.target.value)
//               }
//               placeholder="Enter your email"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="register-password"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>

//             <input
//               id="register-password"
//               type="password"
//               value={password}
//               onChange={(event) =>
//                 setPassword(event.target.value)
//               }
//               placeholder="Create a password"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="branch"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Branch
//             </label>

//             <select
//               id="branch"
//               value={branch}
//               onChange={(event) =>
//                 setBranch(event.target.value)
//               }
//               className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             >
//               <option value="CS">CSE / IT</option>
//               <option value="EC">ECE</option>
//               <option value="EE">EE</option>
//               <option value="ME">ME</option>
//               <option value="CE">CE</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Creating account..." : "Create Account"}
//           </button>
//         </form>

//                 <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500">
//             Already have an account?
//           </p>

//           <button
//             type="button"
//             onClick={onBackToLogin}
//             className="mt-2 font-semibold text-blue-600 hover:text-blue-700"
//           >
//             Back to Login
//           </button>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Register;


//---------------------------


import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  GraduationCap,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Register = ({ onBackToLogin }) => {
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("CS");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !branch
    ) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        branch,
      });

      setSuccess("Registration successful.");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* =========================
            BRAND
        ========================== */}

        <div className="auth-brand">

          <div className="auth-logo">
            GQ
          </div>

          <div className="auth-brand-name">
            GATE Quest
          </div>

          <div className="auth-brand-version">
            PRO v3
          </div>

          <div className="auth-brand-subtitle">
            Smart GATE Preparation
          </div>

        </div>

        {/* =========================
            REGISTER CARD
        ========================== */}

        <div className="auth-card">

          {/* Header */}

          <div className="auth-card-header">

            <div className="auth-status">

              <span className="auth-status-dot" />

              Get started

            </div>

            <h1 className="auth-title">
              Create your account
            </h1>

            <p className="auth-description">
              Set up your GATE Quest Pro
              preparation workspace.
            </p>

          </div>

          {/* Form */}

          <div className="auth-form">

            {/* Error */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="auth-success">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
            >

              {/* Name */}

              <div className="auth-field">

                <label
                  htmlFor="register-name"
                  className="auth-label"
                >
                  Full name
                </label>

                <div className="auth-input-wrapper">

                  <UserRound
                    size={17}
                    className="auth-input-icon"
                  />

                  <input
                    id="register-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="auth-input"
                  />

                </div>

              </div>

              {/* Email */}

              <div className="auth-field">

                <label
                  htmlFor="register-email"
                  className="auth-label"
                >
                  Email address
                </label>

                <div className="auth-input-wrapper">

                  <Mail
                    size={17}
                    className="auth-input-icon"
                  />

                  <input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="auth-input"
                  />

                </div>

              </div>

              {/* Password */}

              <div className="auth-field">

                <label
                  htmlFor="register-password"
                  className="auth-label"
                >
                  Password
                </label>

                <div className="auth-input-wrapper">

                  <LockKeyhole
                    size={17}
                    className="auth-input-icon"
                  />

                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="auth-input"
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Branch */}

              <div className="auth-field">

                <label
                  htmlFor="register-branch"
                  className="auth-label"
                >
                  GATE branch
                </label>

                <div className="auth-input-wrapper">

                  <GraduationCap
                    size={17}
                    className="auth-input-icon"
                  />

                  <select
                    id="register-branch"
                    value={branch}
                    onChange={(event) =>
                      setBranch(
                        event.target.value
                      )
                    }
                    className="auth-input auth-select"
                  >
                    <option value="CS">
                      CSE / IT
                    </option>

                    <option value="EC">
                      ECE
                    </option>

                    <option value="EE">
                      EE
                    </option>

                    <option value="ME">
                      ME
                    </option>

                    <option value="CE">
                      CE
                    </option>
                  </select>

                </div>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit"
              >

                {loading ? (
                  <>
                    <span className="auth-spinner" />

                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={17}
                    />
                  </>
                )}

              </button>

            </form>

          </div>

          {/* Footer */}

          <div className="auth-footer">

            <p className="auth-footer-text">
              Already have an account?
            </p>

            <button
              type="button"
              className="auth-footer-button auth-back-button"
              onClick={onBackToLogin}
            >
              <ArrowLeft size={14} />

              Back to Login
            </button>

          </div>

        </div>

        {/* Security */}

        <div className="auth-security">

          <ShieldCheck size={14} />

          <span>
            Your account is protected with secure
            authentication
          </span>

        </div>

      </div>

    </div>
  );
};

export default Register;