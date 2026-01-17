package org.attendify.controller;

import org.attendify.repository.DailyAttendanceRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student/daily-attendance")
public class StudentDailyAttendanceController {

    private final DailyAttendanceRepository repo;

    public StudentDailyAttendanceController(DailyAttendanceRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/percentage")
    public double percentage() {
        String studentId =
                SecurityContextHolder.getContext()
                        .getAuthentication().getName();

        long total = repo.countByStudentId(studentId);
        long present = repo.countByStudentIdAndStatus(studentId, "PRESENT");

        return total == 0 ? 0 : (present * 100.0) / total;
    }
}
