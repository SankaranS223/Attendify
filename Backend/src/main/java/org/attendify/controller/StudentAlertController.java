package org.attendify.controller;

import org.attendify.model.Alert;
import org.attendify.repository.AlertRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/alerts")
public class StudentAlertController {

    private final AlertRepository alertRepo;

    public StudentAlertController(AlertRepository alertRepo) {
        this.alertRepo = alertRepo;
    }

    @GetMapping
    public List<Alert> myAlerts() {
        String studentId = SecurityContextHolder
                .getContext().getAuthentication().getName();
        return alertRepo.findByStudentId(studentId);
    }
}
