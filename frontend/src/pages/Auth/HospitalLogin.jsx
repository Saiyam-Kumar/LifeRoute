import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function HospitalLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);

            // Hospital dashboard
            navigate("/hospital/dashboard");
        } catch (err) {
            console.error(err);

            if (err.code === "auth/invalid-credential") {
                setError("Incorrect email or password.");
            } else if (err.code === "auth/user-not-found") {
                setError("No hospital account found with this email.");
            } else if (err.code === "auth/wrong-password") {
                setError("Incorrect password.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError(err.message || "Unable to sign in.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0d12] text-white flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                <div className="mb-8">
                    <Link
                        to="/"
                        className="text-gray-400 hover:text-white"
                    >
                        ← Back to LifeRoute
                    </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#15171d] p-8 shadow-xl">

                    <div className="mb-8">
                        <p className="text-sm text-orange-400 font-medium mb-2">
                            LIFEROUTE HOSPITAL PORTAL
                        </p>

                        <h1 className="text-3xl font-bold">
                            Hospital Sign In
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Sign in to manage your hospital resources and
                            emergency capacity.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Hospital Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hospital@example.com"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#1e2026] px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#1e2026] px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-orange-500 py-3 font-semibold hover:bg-orange-600 disabled:opacity-50"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don't have a hospital account?{" "}
                        <Link
                            to="/hospital/register"
                            className="text-orange-400 hover:text-orange-300 font-medium"
                        >
                            Register here
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HospitalLogin;