package com.expense.service;

import com.expense.entity.ExpenseEntity;
import com.expense.repository.ExpenseEntityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ExpenseServiceTest {

    private ExpenseService expenseService;

    @MockBean
    private ExpenseEntityRepository expenseEntityRepository;

    @BeforeEach
    public void setUp() {
        this.expenseService = new ExpenseService(expenseEntityRepository);
    }

    @Test
    public void testCreateExpense() {
        ExpenseEntity expenseEntity = new ExpenseEntity();
        expenseEntity.setId(1L);
        when(expenseEntityRepository.save(expenseEntity)).thenReturn(expenseEntity);
        assertEquals(expenseEntity, expenseService.createExpense(expenseEntity));
    }

    @Test
    public void testGetExpense() {
        ExpenseEntity expenseEntity = new ExpenseEntity();
        expenseEntity.setId(1L);
        when(expenseEntityRepository.findById(1L)).thenReturn(Optional.of(expenseEntity));
        assertEquals(Optional.of(expenseEntity), expenseService.getExpense(1L));
    }

    @Test
    public void testUpdateExpense() {
        ExpenseEntity expenseEntity = new ExpenseEntity();
        expenseEntity.setId(1L);
        expenseEntity.setPlannedExpense(new BigDecimal("5000"));
        expenseEntity.setActualExpense(new BigDecimal("6000"));

        ExpenseEntity updatedExpenseEntity = new ExpenseEntity();
        updatedExpenseEntity.setId(1L);
        updatedExpenseEntity.setPlannedExpense(new BigDecimal("5000"));
        updatedExpenseEntity.setActualExpense(new BigDecimal("7000"));

        when(expenseEntityRepository.findById(1L)).thenReturn(Optional.of(expenseEntity));
        when(expenseEntityRepository.save(any(ExpenseEntity.class))).thenReturn(updatedExpenseEntity);

        assertEquals(updatedExpenseEntity, expenseService.updateExpense(updatedExpenseEntity));
    }

    @Test
    public void testDeleteExpense() {
        doNothing().when(expenseEntityRepository).deleteById(1L);
        expenseService.deleteExpense(1L);
        verify(expenseEntityRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetAllExpense() {
        ExpenseEntity expenseEntity1 = new ExpenseEntity();
        expenseEntity1.setId(1L);
        ExpenseEntity expenseEntity2 = new ExpenseEntity();
        expenseEntity2.setId(2L);
        when(expenseEntityRepository.findAll()).thenReturn(Arrays.asList(expenseEntity1, expenseEntity2));
        List<ExpenseEntity> result = expenseService.getAllExpense();
        assertEquals(2, result.size());
    }
}