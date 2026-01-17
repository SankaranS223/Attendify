import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getStudents,
  markDailyAttendance,
  getTodayDailyAttendance,
} from "../services/adminService";

import "../styles/admin.css";
import "../styles/dailyAttendance.css";

function AdminDailyAttendance() {
  const [students, setStudents] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    const init = async () => {
      try {
        const s = await getStudents();
        const today = await getTodayDailyAttendance();

        setStudents(s.data || []);
        setTodayList(today.data || []);
      } catch (err) {
        console.error("Daily attendance load failed", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  /* =========================
     MARK ATTENDANCE
  ========================= */
  const mark = async (studentId, status) => {
    await markDailyAttendance({ studentId, status });

    // reload today's attendance
    const today = await getTodayDailyAttendance();
    setTodayList(today.data || []);
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <main className="admin-main">
          <h2>Loading daily attendance...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <h1>Daily Attendance</h1>

        {/* STUDENT LIST */}
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => (
              <tr key={s.studentId}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td className="action-cell">
                  <button
                    className="btn-present"
                    onClick={() => mark(s.studentId, "PRESENT")}
                  >
                    Present
                  </button>
                  <button
                    className="btn-absent"
                    onClick={() => mark(s.studentId, "ABSENT")}
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TODAY'S MARKED DAILY ATTENDANCE */}
        <div className="card">
          <h3>Today's Daily Attendance Records</h3>

          {todayList.length === 0 ? (
            <p>No attendance marked today</p>
          ) : (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {todayList.map((a) => (
                  <tr key={a.id}>
                    <td>{a.studentId}</td>
                    <td
                      className={
                        a.status === "PRESENT" ? "green" : "red"
                      }
                    >
                      {a.status}
                    </td>
                    <td>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDailyAttendance;
