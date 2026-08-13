import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import HospitalLayout from "../layouts/HospitalLayout";

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

        {/* ==================== */}
        {/* PUBLIC / LANDING     */}
        {/* ==================== */}

        <Route path="/" element={<Landing />} />

        <Route path="/incidents" element={<Incidents />} />


        {/* ==================== */}
        {/* AUTHENTICATION       */}
        {/* ==================== */}

        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />

        <Route path="/hospital/login" element={<HospitalLogin />} />


        {/* ==================== */}
        {/* PATIENT              */}
        {/* ==================== */}

        <Route path="/patient/dashboard" element={<Dashboard />} />
        <Route path="/patient/assessment" element={<Assessment />} />
        <Route path="/patient/loading" element={<Loading />} />
        <Route path="/patient/results" element={<Results />} />
        <Route path="/patient/history" element={<History />} />
        <Route path="/patient/profile" element={<Profile />} />
        <Route path="/patient/hospital" element={<HospitalDetails />} />


        {/* ==================== */}
        {/* HOSPITAL PORTAL      */}
        {/* ==================== */}

        <Route path="/hospital" element={<HospitalLayout />}>
          <Route path="dashboard" element={<HospitalDashboard />} />
          <Route path="resources" element={<Resources />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<HospitalProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;