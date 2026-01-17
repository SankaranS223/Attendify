package org.attendify.controller;

import org.attendify.model.DailyAttendance;
import org.attendify.repository.DailyAttendanceRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/daily-attendance")
public class AdminDailyAttendanceController {

    private final DailyAttendanceRepository repo;

    public AdminDailyAttendanceController(DailyAttendanceRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public DailyAttendance mark(@RequestBody DailyAttendance a) {
        a.setDate(LocalDate.now());
        return repo.save(a);
    }

    @GetMapping("/today")
    public List<DailyAttendance> today() {
        return repo.findByDate(LocalDate.now());
    }
    @GetMapping("/today-percentage")
    public double todayPercentage() {
        LocalDate today = LocalDate.now();

        long total = repo.countByDate(today);
        long present = repo.countByDateAndStatus(today, "PRESENT");

        return total == 0 ? 0 : (present * 100.0) / total;
    }

}
