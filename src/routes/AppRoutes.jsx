import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import { isAuthenticated } from "../utils/auth";
import Patients from "../pages/patients/Patients";
import PatientProfile from "../pages/patients/PatientProfile";
import NursingAssessment from "../pages/nursing/NursingAssessment";
import NursingDiagnosis from "../pages/nursing/NursingDiagnosis";

function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <AppLayout />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/patients"
            element={<Patients />}
          />

          <Route
            path="/patients/:patientId"
            element={<PatientProfile />}
          />

          <Route
            path="/patients/:patientId/assessment"
            element={<NursingAssessment />}
          />
        </Route>

        <Route
          path="/patients/:patientId/diagnosis"
          element={<NursingDiagnosis />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;