package org.attendify.controller;

import org.attendify.dto.AlertRequest;
import org.attendify.model.Alert;
import org.attendify.service.AlertService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/alerts")
public class AdminAlertController {

    private final AlertService alertService;

    public AdminAlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @PostMapping
    public Alert sendAlert(@RequestBody AlertRequest request) {
        return alertService.createManual(
                request.getStudentId(),
                request.getMessage()
        );
    }
}
