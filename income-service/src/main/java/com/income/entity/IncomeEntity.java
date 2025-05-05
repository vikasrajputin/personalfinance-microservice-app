package com.income.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.income.constant.IncomeSource;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "income")
@Getter
@Setter
public class IncomeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private IncomeSource source;

    private BigDecimal plannedIncome;

    private BigDecimal actualIncome;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate incomeDate;

    private String category;

    private String description;

}