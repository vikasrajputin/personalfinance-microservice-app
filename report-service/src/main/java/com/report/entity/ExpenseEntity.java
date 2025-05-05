package com.report.entity;

import com.report.constant.ExpenseCategory;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expense")
@Getter
@Setter
public class ExpenseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal plannedExpense;

    private BigDecimal actualExpense;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate expenseDate;

    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;

    private String description;

//    private Boolean isRecurring;

//    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
//    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime createdAt;
//
//    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
//    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
//    private LocalDateTime updatedAt;

}