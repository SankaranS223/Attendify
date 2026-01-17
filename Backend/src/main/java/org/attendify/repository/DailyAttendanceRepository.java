package org.attendify.repository;

import org.attendify.model.DailyAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyAttendanceRepository
        extends JpaRepository<DailyAttendance, Long> {

    List<DailyAttendance> findByDate(LocalDate date);

    long countByDate(LocalDate date);

    long countByDateAndStatus(LocalDate date, String status);

    long countByStudentId(String studentId);

    long countByStudentIdAndStatus(String studentId, String status);
}
