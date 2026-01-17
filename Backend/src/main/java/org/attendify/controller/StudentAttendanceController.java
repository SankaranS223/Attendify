package org.attendify.controller;

import org.attendify.model.Attendance;
import org.attendify.repository.AttendanceRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/attendance")
public class StudentAttendanceController {

    private final AttendanceRepository attendanceRepo;

    public StudentAttendanceController(AttendanceRepository attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    // ✅ SUBJECT-WISE ATTENDANCE
    @GetMapping("/{subjectCode}")
    public List<Attendance> getAttendanceBySubject(
            @PathVariable String subjectCode
    ) {
        String studentId = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return attendanceRepo
                .findByStudentIdAndSubjectCode(studentId, subjectCode);
    }
}
