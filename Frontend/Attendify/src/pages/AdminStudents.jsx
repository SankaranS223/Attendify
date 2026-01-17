import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/adminService";
import "../styles/admin.css";
import "../styles/students.css";

function AdminStudents() {
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    rollNo: "",
    department: "",
    year: "",
  });

  const [editId, setEditId] = useState(null);

  // ======================
  // LOAD STUDENTS
  // ======================
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  // ======================
  // FORM HANDLERS
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateStudent(editId, form);
      } else {
        await addStudent(form);
      }

      // reset
      setForm({
        studentId: "",
        name: "",
        email: "",
        rollNo: "",
        department: "",
        year: "",
      });
      setEditId(null);
      loadStudents();
    } catch (err) {
      console.error("Student save failed", err);
    }
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (s) => {
    setEditId(s.studentId);
    setForm({
      studentId: s.studentId,
      name: s.name,
      email: s.email,
      rollNo: s.rollNo,
      department: s.department,
      year: s.year,
    });
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="admin-main">
        <h1>Students</h1>

        {/* ADD / UPDATE FORM */}
        <form className="card student-form" onSubmit={handleSubmit}>
          <input
            className="input"
            name="studentId"
            placeholder="Student ID"
            value={form.studentId}
            onChange={handleChange}
            disabled={!!editId}
            required
          />

          <input
            className="input"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="rollNo"
            placeholder="Roll No"
            value={form.rollNo}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="year"
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary">
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>

        {/* STUDENT TABLE */}
        <div className="card student-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Dept</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.studentId}>
                  <td>{s.studentId}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(s.studentId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminStudents;
