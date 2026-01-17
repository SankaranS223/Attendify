package org.attendify.controller;

import org.attendify.model.Subject;
import org.attendify.repository.SubjectRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/subjects")
public class AdminSubjectController {

    private final SubjectRepository repo;

    public AdminSubjectController(SubjectRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Subject> getAll() {
        return repo.findAll();
    }
}
