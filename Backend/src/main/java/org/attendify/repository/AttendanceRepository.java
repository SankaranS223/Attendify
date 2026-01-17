package org.attendify.repository;

import org.attendify.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    long countByStatus(String status);

    long countByStudentId(String studentId);

    long countByStudentIdAndStatus(String studentId, String status);

    List<Attendance> findByStudentId(String studentId);

    // 🔥 ADD THIS
    List<Attendance> findByStudentIdAndSubjectCode(String studentId, String subjectCode);
    List<Attendance> findByDate(LocalDate date);

}
