package com.expense.controller;

import com.expense.entity.ExpenseEntity;
import com.expense.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@PreAuthorize("hasRole('EXPENSE_MANAGER')")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Create Operation
    @PostMapping
    @PreAuthorize("hasRole('ROLE_EXPENSE_MANAGER')")
    public ResponseEntity<ExpenseEntity> createExpense(@RequestBody ExpenseEntity expenseEntity) {
        ExpenseEntity createdExpense = expenseService.createExpense(expenseEntity);
//        createdExpense.setCreatedAt(LocalDateTime.now());
//        createdExpense.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(createdExpense);
    }

    // Read Operation
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_EXPENSE_MANAGER')")
    public ResponseEntity<ExpenseEntity> getExpense(@PathVariable Long id) {
        return expenseService.getExpense(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Operation
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_EXPENSE_MANAGER')")
    public ResponseEntity<ExpenseEntity> updateExpense(@PathVariable Long id, @RequestBody ExpenseEntity expenseEntity) {
        expenseEntity.setId(id);
        ExpenseEntity updatedExpense = expenseService.updateExpense(expenseEntity);
        //updatedExpense.setUpdatedAt(LocalDateTime.now());
        return ResponseEntity.ok(updatedExpense);
    }

    // Delete Operation
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_EXPENSE_MANAGER')")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    // List all Expenses
    @GetMapping
    @PreAuthorize("hasRole('ROLE_EXPENSE_MANAGER')")
    public ResponseEntity<List<ExpenseEntity>> getAllExpense() {
        List<ExpenseEntity> expenses = expenseService.getAllExpense();
        return ResponseEntity.ok(expenses);
    }
}
