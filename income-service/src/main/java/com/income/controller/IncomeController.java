package com.income.controller;

import com.income.entity.IncomeEntity;
import com.income.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
    private final IncomeService incomeService;

    @Autowired
    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    // Create Operation
    @PostMapping
    @PreAuthorize("hasRole('INCOME_MANAGER')")
    public ResponseEntity<IncomeEntity> createIncome(@RequestBody IncomeEntity incomeEntity) {
        IncomeEntity createdIncome = incomeService.createIncome(incomeEntity);
        return ResponseEntity.ok(createdIncome);
    }

    // Read Operation
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('INCOME_MANAGER')")
    public ResponseEntity<IncomeEntity> getIncome(@PathVariable Long id) {
        return incomeService.getIncome(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Operation
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('INCOME_MANAGER')")
    public ResponseEntity<IncomeEntity> updateIncome(@PathVariable Long id, @RequestBody IncomeEntity incomeEntity) {
        incomeEntity.setId(id);
        IncomeEntity updatedIncome = incomeService.updateIncome(incomeEntity);
        return ResponseEntity.ok(updatedIncome);
    }

    // Delete Operation
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('INCOME_MANAGER')")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    // List all Incomes
    @GetMapping
    @PreAuthorize("hasRole('INCOME_MANAGER')")
    public ResponseEntity<List<IncomeEntity>> getAllIncomes() {
        List<IncomeEntity> incomes = incomeService.getAllIncome();
        return ResponseEntity.ok(incomes);
    }
}
