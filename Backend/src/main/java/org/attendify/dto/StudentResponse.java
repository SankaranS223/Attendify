package org.attendify.dto;

public class StudentResponse {

    private String studentId;
    private String name;
    private String email;
    private String rollNo;
    private String department;
    private int year;

    public StudentResponse(
            String studentId,
            String name,
            String email,
            String rollNo,
            String department,
            int year
    ) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.rollNo = rollNo;
        this.department = department;
        this.year = year;
    }

    public String getStudentId() { return studentId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRollNo() { return rollNo; }
    public String getDepartment() { return department; }
    public int getYear() { return year; }
}
