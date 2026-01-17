import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { sendAlert, getStudents } from "../services/adminService";
import "../styles/admin.css";
import "../styles/alerts.css";

function AdminAlerts() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    message: "",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendAlert(form);
    alert("Alert sent successfully");

    setForm({
      studentId: "",
      message: "",
    });
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <h1>Send Alert</h1>

        <form className="card alert-form" onSubmit={handleSubmit}>
          {/* ✅ STUDENT DROPDOWN */}
          <select
            className="input"
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

          <textarea
            className="input"
            name="message"
            placeholder="Alert message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button className="btn btn-danger">
            Send Alert
          </button>
        </form>
      </main>
    </div>
  );
}

export default AdminAlerts;
