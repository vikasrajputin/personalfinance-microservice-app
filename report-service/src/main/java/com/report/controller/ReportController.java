package com.report.controller;

import com.report.dto.ReportDTO;
import com.report.dto.ReportDTOOver;
import com.report.dto.ReportIncomeDTO;
import com.report.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/expense")
    public ResponseEntity<List<ReportDTO>> totalExp(){

        List<ReportDTO> reportDTOS = reportService.getTotalExpenses();
        return ResponseEntity.ok(reportDTOS);
    }

    @GetMapping("/incomes")
    public ResponseEntity<List<ReportIncomeDTO>> totalIncome(){

        List<ReportIncomeDTO> reportIncomeDTOS =reportService.getTotalIncome();
        return ResponseEntity.ok(reportIncomeDTOS);
    }


    @GetMapping("/overSpend")
    public ResponseEntity<List<ReportDTOOver>> overSpend(){

        List<ReportDTOOver> reportDTOS =reportService.getOverExpense();
        return ResponseEntity.ok(reportDTOS);
    }

    // Implement Tasks
}
