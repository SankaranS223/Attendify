import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getStudents,
  getSubjects,
  markAttendance,
  getTodaySubjectAttendance,
} from "../services/adminService";

import "../styles/admin.css";
import "../styles/attendance.css";

function AdminAttendance() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    studentId: "",
    subjectCode: "",
    date: new Date().toISOString().split("T")[0],
    status: "PRESENT",
  });

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    const init = async () => {
      try {
        const s = await getStudents();
        const sub = await getSubjects();
        const today = await getTodaySubjectAttendance();

        setStudents(s.data || []);
        setSubjects(sub.data || []);
        setTodayList(today.data || []);
      } catch (err) {
        console.error("Failed to load attendance", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  /* =========================
     FORM HANDLERS
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await markAttendance(form);              // POST
    const today = await getTodaySubjectAttendance(); // GET
    setTodayList(today.data || []);

    setForm({
      ...form,
      studentId: "",
      status: "PRESENT",
    });

    alert("Attendance marked successfully");
  };

  /* =========================
     SUBJECT-WISE GROUPING
  ========================= */
  const subjectMap = {};
  todayList.forEach((a) => {
    if (!subjectMap[a.subjectCode]) {
      subjectMap[a.subjectCode] = [];
    }
    subjectMap[a.subjectCode].push(a);
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

  /* =========================
     UI
  ========================= */
  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <h1>Subject-wise Attendance</h1>

        {/* MARK ATTENDANCE FORM */}
        <form className="card attendance-form" onSubmit={handleSubmit}>
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.studentId} value={s.studentId}>
                {s.name} ({s.studentId})
              </option>
            ))}
          </select>

          <select
            name="subjectCode"
            value={form.subjectCode}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.subjectCode} value={s.subjectCode}>
                {s.subjectName}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="PRESENT">PRESENT</option>
            <option value="ABSENT">ABSENT</option>
          </select>

          <button className="btn btn-primary">
            Mark Attendance
          </button>
        </form>

        {/* TODAY'S SUBJECT-WISE ATTENDANCE */}
        <div className="card">
          <h3>Today's Subject-wise Attendance</h3>

          {Object.keys(subjectMap).length === 0 ? (
            <p>No attendance marked today</p>
          ) : (
            Object.entries(subjectMap).map(([subject, records]) => (
              <div key={subject} className="subject-block">
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
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminAttendance;
