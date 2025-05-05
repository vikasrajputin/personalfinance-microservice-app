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
public class ReportIncomeDTO {

    private String source;
    private BigDecimal totalplannedIncome;
    private BigDecimal totalactualIncome;

}
