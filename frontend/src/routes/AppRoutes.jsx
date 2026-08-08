import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing
import Landing from "../pages/Landing/Landing";
import Incidents from "../pages/Incidents/Incidents";

// Auth
import PatientLogin from "../pages/Auth/PatientLogin";
import PatientRegister from "../pages/Auth/PatientRegister";
import HospitalLogin from "../pages/Auth/HospitalLogin";

// Patient
import Dashboard from "../pages/Patient/Dashboard";
import Assessment from "../pages/Patient/Assessment";
import Loading from "../pages/Patient/Loading";
import Results from "../pages/Patient/Results";
import HospitalDetails from "../pages/Patient/HospitalDetails";
import History from "../pages/Patient/History";
import Profile from "../pages/Patient/Profile";

// Hospital
import HospitalDashboard from "../pages/Hospital/Dashboard";
import Resources from "../pages/Hospital/Resources";
import Analytics from "../pages/Hospital/Analytics";
import HospitalProfile from "../pages/Hospital/Profile";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Landing />} />

                <Route path="/patient/login" element={<PatientLogin />} />
                <Route path="/patient/register" element={<PatientRegister />} />

                <Route path="/patient/dashboard" element={<Dashboard />} />
                <Route path="/patient/assessment" element={<Assessment />} />
                <Route path="/patient/loading" element={<Loading />} />
                <Route path="/patient/results" element={<Results />} />
                <Route path="/patient/history" element={<History />} />
                <Route path="/patient/profile" element={<Profile />} />
                <Route path="/patient/hospital" element={<HospitalDetails />} />

                <Route path="/hospital/login" element={<HospitalLogin />} />
                <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
                <Route path="/hospital/resources" element={<Resources />} />
                <Route path="/hospital/analytics" element={<Analytics />} />
                <Route path="/hospital/profile" element={<HospitalProfile />} />
                <Route path="/incidents" element={<Incidents />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;