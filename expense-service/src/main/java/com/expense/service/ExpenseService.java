package com.expense.service;

import com.expense.entity.ExpenseEntity;
import com.expense.repository.ExpenseEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    private final ExpenseEntityRepository expenseEntityRepository;

    @Autowired
    public ExpenseService(ExpenseEntityRepository expenseEntityRepository) {
        this.expenseEntityRepository = expenseEntityRepository;
    }

    // Create Operation
    public ExpenseEntity createExpense(ExpenseEntity expenseEntity) {
        return expenseEntityRepository.save(expenseEntity);
    }

    // Read Operation
    public Optional<ExpenseEntity> getExpense(Long id) {
        return expenseEntityRepository.findById(id);
    }

    // Update Operation
    public ExpenseEntity updateExpense(ExpenseEntity expenseEntity) {
        Optional<ExpenseEntity> expenseFromDb = expenseEntityRepository.findById(expenseEntity.getId());
        ExpenseEntity inc = null;
        if(expenseFromDb.isPresent()){
            inc = expenseFromDb.get();
            if(expenseEntity.getActualExpense() != null){
                inc.setActualExpense(expenseEntity.getActualExpense());
            }

            if(expenseEntity.getPlannedExpense() != null){
                inc.setPlannedExpense(expenseEntity.getPlannedExpense());
            }

            if(expenseEntity.getExpenseDate() != null){
                inc.setExpenseDate(expenseEntity.getExpenseDate());
            }

            if(expenseEntity.getCategory() != null){
                inc.setCategory(expenseEntity.getCategory());
            }

//            if(expenseEntity.getIsRecurring() != null){
//                inc.setIsRecurring(expenseEntity.getIsRecurring());
//            }

            if(expenseEntity.getDescription() != null){
                inc.setDescription(expenseEntity.getDescription());
            }

//            if(expenseEntity.getUpdatedAt() != null){
//                inc.setUpdatedAt(expenseEntity.getUpdatedAt());
//            }
        }
        return expenseEntityRepository.save(inc);
    }

    // Delete Operation
    public void deleteExpense(Long id) {
        expenseEntityRepository.deleteById(id);
    }

    // List all Expenses
    public List<ExpenseEntity> getAllExpense() {
        return expenseEntityRepository.findAll();
    }
}
