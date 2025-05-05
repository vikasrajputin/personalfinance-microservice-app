package com.report.service;

import com.report.dto.ReportDTO;
import com.report.dto.ReportDTOOver;
import com.report.dto.ReportIncomeDTO;
import com.report.repository.ExpenseEntityRepository;
import com.report.repository.IncomeEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    public ReportService(ExpenseEntityRepository entityRepository, IncomeEntityRepository incomeEntityRepository) {
        this.entityRepository = entityRepository;
        this.incomeEntityRepository = incomeEntityRepository;
    }

    private final ExpenseEntityRepository entityRepository;

    private final IncomeEntityRepository incomeEntityRepository;

    // Implement Services


    public List<ReportDTO> getTotalExpenses(){
        List<ReportDTO> reportDTO = new ArrayList<>();
        List<Object[]> result = entityRepository.getTotalByCategory();

        for(Object[] row:result){

            ReportDTO dto = new ReportDTO();

            dto.setCategory((String) row[0]);
            dto.setTotalActualExpense((BigDecimal) row[1]);
            dto.setTotalPlannedExpense((BigDecimal) row[2]);

            reportDTO.add(dto);
        }
        return reportDTO;
    }

    public List<ReportIncomeDTO>getTotalIncome() {
        List<ReportIncomeDTO> dtos = new ArrayList<>();
        List<Object[]> result = incomeEntityRepository.getTotalBySource();
        ReportIncomeDTO incomeDTO = new ReportIncomeDTO();
        for (Object[] row : result) {
            incomeDTO = new ReportIncomeDTO();
            incomeDTO.setSource((String) row[0]);
            incomeDTO.setTotalplannedIncome((BigDecimal) row[1]);
            incomeDTO.setTotalactualIncome((BigDecimal) row[2]);
            dtos.add(incomeDTO);
        }
        return dtos;
    }


    public List<ReportDTOOver> getOverExpense(){
        List<ReportDTOOver> dtos = new ArrayList<>();
        List<Object[]> overExp = entityRepository.getOverExpense();

        for(Object[] row : overExp){
            ReportDTOOver exp = new ReportDTOOver();
            exp.setDescription((String) row[0]);
            exp.setTotalPlannedExpense((BigDecimal) row[1]);
            exp.setTotalActualExpense((BigDecimal) row[2]);
            dtos.add(exp);
        }
        return dtos;
    }


}


