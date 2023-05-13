package com.sarah.payroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.sarah.payroll")
@EntityScan("com.sarah.payroll")
public class PayrollApplication {
    public static void main(String[] args) {
        SpringApplication.run(PayrollApplication.class, args);
    }
}