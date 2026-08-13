import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { login, getMe } from "../../services/authService";

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97l3.05 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}

function LifeRouteMark({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="4" cy="21" r="2.5" fill="currentColor" />
      <circle cx="22" cy="5" r="2.5" fill="#FF5A36" />
      <path
        d="M5.5 19.5C11 12 13 12 20 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="1 4.2"
      />
    </svg>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 py-3.5 text-[14.5px] text-canvas placeholder:text-white/30 outline-none transition-colors focus:border-route/50 focus:bg-white/[0.06]";

const FLOW_HINTS = [
  "Symptoms in — 2 minutes",
  "KTAS-based severity scoring",
  "Real-time hospital capacity",
];

export default function PatientLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await login(email.trim(), password);

      const profile = await getMe();

      if (profile?.role !== "patient") {
        setError("This account is not registered as a patient.");
        return;
      }

      navigate("/patient/assessment");
    } catch (err) {
      console.error(err);

      if (
        err?.code === "auth/invalid-credential" ||
        err?.code === "auth/wrong-password" ||
        err?.code === "auth/user-not-found"
      ) {
        setError("Incorrect email or password.");
      } else if (err?.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err?.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(
          err?.message ||
          "Unable to sign in. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleGoogleSignIn() {
    setError("Google sign-in is not available in the first version.");
  }

  return (
    <div className="min-h-screen bg-ink relative overflow-hidden flex flex-col lg:flex-row">
      <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(65% 55% at 18% 15%, rgba(124,140,245,0.18) 0%, rgba(11,13,18,0) 60%), radial-gradient(55% 50% at 85% 80%, rgba(255,90,54,0.14) 0%, rgba(11,13,18,0) 60%), radial-gradient(45% 40% at 90% 10%, rgba(199,124,245,0.10) 0%, rgba(11,13,18,0) 60%)",
        }}
      />

      <div className="relative hidden lg:flex lg:w-[44%] flex-col justify-between px-14 py-12">
        <Link
          to="/"
          className="flex items-center gap-2.5 w-fit text-canvas"
        >
          <LifeRouteMark />
          <span className="font-display font-semibold text-[17px] tracking-tightest">
            LifeRoute
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-route animate-pulse-soft" />
            <span className="font-mono text-[12px] tracking-wide text-white/60">
              Emergency access, without the wait
            </span>
          </div>

          <h2 className="font-display font-semibold text-canvas leading-[1.1] tracking-tightest text-[clamp(1.8rem,2.6vw,2.4rem)] text-balance">
            Your assessments and
            <br />
            history, in one place.
          </h2>

          <p className="text-white/55 text-[15px] leading-relaxed max-w-sm">
            Sign in to pick up where you left off, revisit past
            recommendations, and get routed faster next time.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            {FLOW_HINTS.map((hint, i) => (
              <motion.div
                key={hint}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                }}
                className="flex items-center gap-2.5"
              >
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-signal/15 border border-signal/30 shrink-0">
                  <Sparkles
                    size={11}
                    strokeWidth={2}
                    className="text-signal"
                  />
                </span>

                <span className="text-[13px] text-white/50">
                  {hint}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center gap-2 text-white/30">
          <ShieldCheck size={14} strokeWidth={1.75} />
          <span className="text-[12px]">
            Your data stays private and encrypted.
          </span>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="lg:hidden flex items-center gap-2.5 w-fit text-canvas mb-10"
          >
            <LifeRouteMark size={22} />
            <span className="font-display font-semibold text-[16px] tracking-tightest">
              LifeRoute
            </span>
          </Link>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-9 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.65)]">
            <div className="mb-8">
              <h1 className="font-display font-semibold text-[24px] sm:text-[26px] text-canvas tracking-tightest">
                Welcome back
              </h1>

              <p className="text-[14px] text-white/50 mt-2 leading-relaxed">
                Sign in to access your emergency assessments
                and hospital recommendation history.
              </p>
            </div>

            <form
              onSubmit={handleSignIn}
              className="flex flex-col gap-5"
              noValidate
            >
              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-medium text-white/70">
                  Email
                </span>

                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={1.75}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className={inputClass}
                    required
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-white/70">
                    Password
                  </span>

                  <Link
                    to="/patient/forgot-password"
                    className="text-[12.5px] font-medium text-route hover:text-[#ff6b4a] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={16}
                    strokeWidth={1.75}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className={`${inputClass} pr-11`}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((v) => !v)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={16}
                        strokeWidth={1.75}
                      />
                    ) : (
                      <Eye
                        size={16}
                        strokeWidth={1.75}
                      />
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-route px-6 py-3.5 text-[14.5px] font-medium text-canvas transition-all duration-300 hover:bg-[#ff6b4a] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)]"
              >
                {isSubmitting
                  ? "Signing in..."
                  : "Sign In"}

                {!isSubmitting && (
                  <ArrowRight
                    size={15}
                    strokeWidth={2.25}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <span className="h-px flex-1 bg-white/10" />

              <span className="font-mono text-[11px] uppercase tracking-wide text-white/30">
                or
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-canvas hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 active:scale-[0.98]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="text-center text-[13.5px] text-white/50 mt-8">
              Don't have an account?{" "}
              <Link
                to="/patient/register"
                className="text-route hover:text-[#ff6b4a] font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/patient/register"
              className="font-semibold text-orange-400 hover:text-orange-300 transition"
            >
              Create account
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-[13px] text-white/35 hover:text-white/60 transition-colors"
            >
              ← Back to LifeRoute
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}