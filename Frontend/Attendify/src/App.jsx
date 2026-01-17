import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminAttendance from "./pages/AdminAttendance";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminAlerts from "./pages/AdminAlerts";
import AdminDailyAttendance from "./pages/AdminDailyAttendance";


function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminStudents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminAttendance />
          </ProtectedRoute>
        }
      />

      {/* STUDENT */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/alerts"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminAlerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/daily-attendance"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDailyAttendance />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
