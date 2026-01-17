    package org.attendify.dto;

    public class AttendancePercentageResponse {

        private double percentage;

        public AttendancePercentageResponse(double percentage) {
            this.percentage = percentage;
        }

        public double getPercentage() {
            return percentage;
        }

        public void setPercentage(double percentage) {
            this.percentage = percentage;
        }
    }
