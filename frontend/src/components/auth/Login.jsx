// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import Register from "./Register";

// const Login = () => {
//   const { login, loading } = useAuth();
//   const [showRegister, setShowRegister] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");

//     if (!email.trim() || !password.trim()) {
//       setError("Email and password are required.");
//       return;
//     }

//     try {
//       await login({
//         email: email.trim(),
//         password,
//       });
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Login failed. Please check your credentials.";

//       setError(message);
//     }
//   };

//   if (showRegister) {
//   return (
//     <Register
//       onBackToLogin={() => setShowRegister(false)}
//     />
//   );
// }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900">
//             GATE Quest Pro
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Sign in to continue
//           </p>
//         </div>

//         {error && (
//           <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>

//             <input
//               id="email"
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
//               htmlFor="password"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>

//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(event) =>
//                 setPassword(event.target.value)
//               }
//               placeholder="Enter your password"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//   <p className="text-sm text-gray-500">
//     Don't have an account?
//   </p>

//   <button
//     type="button"
//     onClick={() => setShowRegister(true)}
//     className="mt-2 font-semibold text-blue-600 hover:text-blue-700"
//   >
//     Create Account
//   </button>
// </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



//------------------------------------------
import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Register from "./Register";

const Login = () => {
  const { login, loading } = useAuth();

  const [showRegister, setShowRegister] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      await login({
        email: email.trim(),
        password,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(message);
    }
  };

  if (showRegister) {
    return (
      <Register
        onBackToLogin={() =>
          setShowRegister(false)
        }
      />
    );
  }

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
            LOGIN CARD
        ========================== */}

        <div className="auth-card">

          {/* Header */}

          <div className="auth-card-header">

            <div className="auth-status">

              <span className="auth-status-dot" />

              Welcome back

            </div>

            <h1 className="auth-title">
              Sign in to your account
            </h1>

            <p className="auth-description">
              Continue your GATE preparation
              journey.
            </p>

          </div>

          {/* Form */}

          <div className="auth-form">

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
            >

              {/* Email */}

              <div className="auth-field">

                <label
                  htmlFor="login-email"
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
                    id="login-email"
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
                  htmlFor="login-password"
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
                    id="login-password"
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit"
              >

                {loading ? (
                  <>
                    <span className="auth-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

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
              Don't have an account?
            </p>

            <button
              type="button"
              className="auth-footer-button"
              onClick={() =>
                setShowRegister(true)
              }
            >
              Create your account
            </button>

          </div>

        </div>

        {/* Security */}

        <div className="auth-security">

          <ShieldCheck size={14} />

          <span>
            Secure authentication
          </span>

        </div>

      </div>

    </div>
  );
};

export default Login;