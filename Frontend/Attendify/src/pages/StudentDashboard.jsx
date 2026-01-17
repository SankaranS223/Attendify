import { useEffect, useState } from "react";
import {
  getDailyAttendancePercentage,
  getAlerts,
  getAttendanceBySubject,
} from "../services/studentService";

import "../styles/students.css";

function StudentDashboard() {
  const [percentage, setPercentage] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [records, setRecords] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  /* ======================
     INITIAL LOAD
  ====================== */
  useEffect(() => {
    const load = async () => {
      try {
        const p = await getDailyAttendancePercentage();
        const a = await getAlerts();

        setPercentage(p.data || 0);
        setAlerts(a.data || []);
      } catch (err) {
        console.error("Student dashboard load failed", err);
      }
    };
    load();
  }, []);

  /* ======================
     SUBJECT ATTENDANCE
  ====================== */
  const loadSubject = async () => {
    if (!subject) return;

    setLoading(true);
    try {
      const res = await getAttendanceBySubject(subject);
      setRecords(res.data || []);
    } catch (err) {
      console.error("Subject attendance failed", err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-container">
      <h1 className="page-title">Student Dashboard</h1>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Daily Attendance</p>
          <h2>{percentage.toFixed(2)}%</h2>
        </div>
      </div>

      {/* ALERTS */}
      <div className="card">
        <h3>Alerts</h3>

        {alerts.length === 0 ? (
          <p className="muted">No alerts</p>
        ) : (
          alerts.map((a) => (
            <div key={a.alertId} className="alert-item">
              {a.message}
            </div>
          ))
        )}
      </div>

      {/* SUBJECT ATTENDANCE */}
      <div className="card">
        <h3>Subject-wise Attendance</h3>

        <div className="subject-search">
          <input
            placeholder="Enter Subject Code (ex: CS301)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button onClick={loadSubject} disabled={loading}>
            {loading ? "Loading..." : "Load"}
          </button>
        </div>

        {records.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.attendanceId}>
                  <td>{r.date}</td>
                  <td
                    className={
                      r.status === "PRESENT" ? "green" : "red"
                    }
                  >
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {records.length === 0 && !loading && subject && (
          <p className="muted">No records found</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
