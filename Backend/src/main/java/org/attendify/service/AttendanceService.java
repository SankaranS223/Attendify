package org.attendify.service;

import org.attendify.model.Attendance;
import org.attendify.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;

    public AttendanceService(AttendanceRepository attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    public List<Attendance> getByStudent(String studentId) {
        return attendanceRepo.findByStudentId(studentId);
    }

    public List<Attendance> getByStudentAndSubject(
            String studentId,
            String subjectCode
    ) {
        return attendanceRepo.findByStudentIdAndSubjectCode(studentId, subjectCode);
    }
    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return attendanceRepo.findByDate(date);
    }

}
