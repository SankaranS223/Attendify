import api from "./api";

/* =========================
   STUDENTS CRUD
========================= */
export const getStudents = () =>
  api.get("/api/admin/students");

export const addStudent = (data) =>
  api.post("/api/admin/students", data);

export const updateStudent = (id, data) =>
  api.put(`/api/admin/students/${id}`, data);

export const deleteStudent = (id) =>
  api.delete(`/api/admin/students/${id}`);

/* =========================
   SUBJECTS
========================= */
export const getSubjects = () =>
  api.get("/api/admin/subjects");

/* =========================
   SUBJECT-WISE ATTENDANCE
========================= */
export const markAttendance = (data) =>
  api.post("/api/admin/attendance", data);

export const getTodaySubjectAttendance = () =>
  api.get("/api/admin/attendance/today");

/* =========================
   DAILY ATTENDANCE
========================= */
export const markDailyAttendance = (data) =>
  api.post("/api/admin/daily-attendance", data);

export const getTodayDailyAttendance = () =>
  api.get("/api/admin/daily-attendance/today");

export const getTodayDailyAttendancePercentage = () =>
  api.get("/api/admin/daily-attendance/today-percentage");

/* =========================
   DASHBOARD / ANALYTICS
========================= */
export const getTodayAttendance = () =>
  api.get("/api/admin/analytics/today-percentage");

/* =========================
   ALERTS
========================= */
export const sendAlert = (data) =>
  api.post("/api/admin/alerts", data);
