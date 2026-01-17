package org.attendify.controller;

import org.attendify.model.Attendance;
import org.attendify.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/attendance")
public class AdminAttendanceController {

    private final AttendanceService attendanceService;

    public AdminAttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // ADMIN MARK ATTENDANCE
    @PostMapping
    public Attendance mark(@RequestBody Attendance attendance) {
        return attendanceService.markAttendance(attendance);
    }
    @GetMapping("/today")
    public List<Attendance> getTodayAttendance() {
        LocalDate today = LocalDate.now();
        return attendanceService.getAttendanceByDate(today);
    }

}
