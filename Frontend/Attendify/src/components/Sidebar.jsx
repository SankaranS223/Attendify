import { Link } from "react-router-dom";
import "../styles/admin.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Attendify</h2>

      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/students">Students</Link>
        <Link to="/admin/daily-attendance">Daily Attendance</Link>
        <Link to="/admin/attendance">Subject Attendance</Link>
        <Link to="/admin/alerts">Alerts</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
