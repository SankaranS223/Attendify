package org.attendify.service;

import org.attendify.model.Alert;
import org.attendify.repository.AlertRepository;
import org.attendify.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

@Service
public class AlertService {

    private final AlertRepository alertRepo;
    private final AttendanceRepository attendanceRepo;

    public AlertService(AlertRepository alertRepo,
                        AttendanceRepository attendanceRepo) {
        this.alertRepo = alertRepo;
        this.attendanceRepo = attendanceRepo;
    }

    // 🔥 AUTO ALERT (<75%)
    public void checkAndCreateAlert(String studentId) {
        long total = attendanceRepo.countByStudentId(studentId);
        long present = attendanceRepo.countByStudentIdAndStatus(studentId, "PRESENT");

        if (total == 0) return;

        double percent = (present * 100.0) / total;
        if (percent < 75) {
            Alert alert = new Alert();
            alert.setStudentId(studentId);
            alert.setMessage("Attendance below 75%");
            alertRepo.save(alert);
        }
    }

    // 🧑‍🏫 MANUAL ALERT
    public Alert createManual(String studentId, String message) {
        Alert alert = new Alert();
        alert.setStudentId(studentId);
        alert.setMessage(message);
        return alertRepo.save(alert);
    }
}
