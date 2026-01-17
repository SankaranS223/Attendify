import api from "./api";

export const getTotalStudents = async () => {
  const res = await api.get("/api/admin/students");
  return res.data.length;
};

export const getSubjectsCount = async () => {
  const res = await api.get("/api/admin/subjects"); // if exists
  return res.data.length;
};

export const getTodayAttendance = async () => {
  const res = await api.get("/api/admin/attendance/today"); // recommended
  return res.data.percentage;
};
