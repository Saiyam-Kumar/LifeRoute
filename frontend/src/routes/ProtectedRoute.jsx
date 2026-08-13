import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">
            Loading...
        </div>;
    }

    if (!user) {
        return <Navigate to={`/${role}/login`} replace />;
    }

    if (profile?.role && profile.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;