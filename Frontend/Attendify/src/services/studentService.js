import api from "./api";

export const getAttendancePercentage = () =>
  api.get("/api/student/analytics/percentage");

export const getAlerts = () =>
  api.get("/api/student/alerts");

export const getAttendanceBySubject = (subjectCode) =>
  api.get(`/api/student/attendance/${subjectCode}`);
export const getTodayAttendance = () =>
  api.get("/api/admin/analytics/today-percentage");
export const getDailyAttendancePercentage = () =>
  api.get("/api/student/daily-attendance/percentage");
