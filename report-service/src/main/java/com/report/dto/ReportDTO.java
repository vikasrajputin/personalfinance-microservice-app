package com.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {

    private String category;
    private BigDecimal totalActualExpense;
    private BigDecimal totalPlannedExpense;


}