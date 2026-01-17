package org.attendify.service;

import org.attendify.dto.AddStudentRequest;
import org.attendify.dto.StudentResponse;
import org.attendify.model.Student;
import org.attendify.model.User;
import org.attendify.repository.StudentRepository;
import org.attendify.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepo;
    private final UserRepository userRepo;

    public StudentService(StudentRepository studentRepo,
                          UserRepository userRepo) {
        this.studentRepo = studentRepo;
        this.userRepo = userRepo;
    }

    // ==========================
    // CREATE (USER + STUDENT)
    // ==========================
    public void addStudent(AddStudentRequest req) {

        // 1. Create User
        User user = new User();
        user.setUserId(req.getStudentId());
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword("pass123"); // default password
        user.setRole("STUDENT");

        userRepo.save(user);

        // 2. Create Student
        Student student = new Student();
        student.setStudentId(req.getStudentId());
        student.setRollNo(req.getRollNo());
        student.setDepartment(req.getDepartment());
        student.setYear(req.getYear());

        studentRepo.save(student);
    }

    // ==========================
    // READ ALL (DTO)
    // ==========================
    public List<StudentResponse> getAllStudents() {
        return studentRepo.findAll().stream().map(student -> {

            User user = userRepo.findById(student.getStudentId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return new StudentResponse(
                    student.getStudentId(),
                    user.getName(),
                    user.getEmail(),
                    student.getRollNo(),
                    student.getDepartment(),
                    student.getYear()
            );
        }).toList();
    }

    // ==========================
    // UPDATE (USER + STUDENT)
    // ==========================
    public void updateStudent(String id, AddStudentRequest req) {

        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setRollNo(req.getRollNo());
        student.setDepartment(req.getDepartment());
        student.setYear(req.getYear());

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(req.getName());
        user.setEmail(req.getEmail());

        userRepo.save(user);
        studentRepo.save(student);
    }

    // ==========================
    // DELETE (CLEAN)
    // ==========================
    public void deleteStudent(String id) {
        studentRepo.deleteById(id);
        userRepo.deleteById(id);
    }
}
