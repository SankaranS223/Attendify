import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getStudents,
  getSubjects,
  getTodaySubjectAttendance,
  getTodayDailyAttendancePercentage,
} from "../services/adminService";

import "../styles/admin.css";
import "../styles/attendance.css";

function AdminAttendance() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [todayPercent, setTodayPercent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const studentsRes = await getStudents();
        const subjectsRes = await getSubjects();
        const subjectAttendanceRes = await getTodaySubjectAttendance();
        const dailyPercentRes =
          await getTodayDailyAttendancePercentage();

        setStudents(studentsRes?.data || []);
        setSubjects(subjectsRes?.data || []);
        setTodayList(subjectAttendanceRes?.data || []);
        setTodayPercent(dailyPercentRes?.data || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  /* GROUP SUBJECT-WISE */
  const groupedBySubject = {};
  todayList.forEach((item) => {
    if (!item?.subjectCode) return;
    if (!groupedBySubject[item.subjectCode]) {
      groupedBySubject[item.subjectCode] = [];
    }
    groupedBySubject[item.subjectCode].push(item);
  });

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <h2>Loading attendance...</h2>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <h2 style={{ color: "red" }}>{error}</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        {/* DASHBOARD CARDS */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <p>Total Students</p>
            <h2>{students.length}</h2>
          </div>

          <div className="dashboard-card">
            <p>Subjects</p>
            <h2>{subjects.length}</h2>
          </div>

          <div className="dashboard-card">
            <p>Today's Attendance</p>
            <h2>{todayPercent}%</h2>
          </div>
        </div>

        {/* SUBJECT-WISE ATTENDANCE */}
        <div className="card">
          <h3>Today's Attendance (Subject-wise)</h3>

          {Object.keys(groupedBySubject).length === 0 ? (
            <p>No attendance marked today</p>
          ) : (
            Object.entries(groupedBySubject).map(([subject, records]) => (
              <div key={subject} style={{ marginBottom: "24px" }}>
                <h4>{subject}</h4>

                <table>
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r.attendanceId}>
                        <td>{r.studentId}</td>
                        <td
                          style={{
                            color:
                              r.status === "PRESENT"
                                ? "green"
                                : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {r.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminAttendance;
