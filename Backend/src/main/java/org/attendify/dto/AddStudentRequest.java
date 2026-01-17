package org.attendify.dto;

public class AddStudentRequest {
    private String studentId;
    private String name;
    private String email;
    private String rollNo;
    private String department;
    private int year;

    public String getStudentId() { return studentId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRollNo() { return rollNo; }
    public String getDepartment() { return department; }
    public int getYear() { return year; }
}
