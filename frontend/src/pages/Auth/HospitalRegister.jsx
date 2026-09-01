import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, getIdToken } from "../../services/authService";

const API_URL =
    import.meta.env.VITE_API_URL || "https://liferoute-w329.onrender.com";

function HospitalRegister() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        hospitalName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            // -----------------------------------------
            // 1. Create Firebase authentication account
            // -----------------------------------------

            const firebaseUser = await register(
                form.email,
                form.password
            );

            console.log(
                "Firebase account created:",
                firebaseUser.uid
            );

            // -----------------------------------------
            // 2. Get Firebase ID token
            // -----------------------------------------

            const token = await getIdToken();

            // -----------------------------------------
            // 3. Create LifeRoute hospital record
            // -----------------------------------------

            const response = await fetch(
                `${API_URL}/hospital/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        name: form.hospitalName,
                        email: form.email,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail ||
                    data.message ||
                    "Unable to create hospital profile."
                );
            }

            console.log(
                "LifeRoute hospital created:",
                data
            );

            // -----------------------------------------
            // 4. Hospital registration complete
            // -----------------------------------------

            navigate("/hospital/dashboard");

        } catch (err) {
            console.error(
                "Hospital registration failed:",
                err
            );

            if (err.code === "auth/email-already-in-use") {
                setError(
                    "An account already exists with this email."
                );
            } else if (err.code === "auth/invalid-email") {
                setError(
                    "Please enter a valid email address."
                );
            } else if (err.code === "auth/weak-password") {
                setError(
                    "Password is too weak."
                );
            } else {
                setError(
                    err.message ||
                    "Unable to create hospital account."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0d12] text-white flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-lg">

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
                            Register Hospital
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Create an account to access the LifeRoute hospital
                            management portal.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Hospital Name
                            </label>

                            <input
                                type="text"
                                name="hospitalName"
                                value={form.hospitalName}
                                onChange={handleChange}
                                placeholder="Enter hospital name"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#1e2026] px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Hospital Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
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
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create password"
                                required
                                className="w-full rounded-xl border border-white/10 bg-[#1e2026] px-4 py-3 outline-none focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
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
                            {loading
                                ? "Creating Account..."
                                : "Create Hospital Account"}
                        </button>

                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">

                        Already have an account?{" "}

                        <Link
                            to="/hospital/login"
                            className="text-orange-400 hover:text-orange-300 font-medium"
                        >
                            Sign in
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HospitalRegister;