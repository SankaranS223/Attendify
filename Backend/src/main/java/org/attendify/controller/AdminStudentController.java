package org.attendify.controller;

import org.attendify.dto.AddStudentRequest;
import org.attendify.dto.StudentResponse;
import org.attendify.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
public class AdminStudentController {

    private final StudentService studentService;

    public AdminStudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @PostMapping
    public void create(@RequestBody AddStudentRequest req) {
        studentService.addStudent(req);
    }


    @GetMapping
    public List<StudentResponse> getAll() {
        return studentService.getAllStudents();
    }


    @PutMapping("/{id}")
    public void update(@PathVariable String id,
                       @RequestBody AddStudentRequest req) {
        studentService.updateStudent(id, req);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        studentService.deleteStudent(id);
    }
}
