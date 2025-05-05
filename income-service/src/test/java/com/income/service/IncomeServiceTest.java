package com.income.service;

import com.income.entity.IncomeEntity;
import com.income.repository.IncomeEntityRepository;
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
public class IncomeServiceTest {

    private IncomeService incomeService;

    @MockBean
    private IncomeEntityRepository incomeEntityRepository;

    @BeforeEach
    public void setUp() {
        this.incomeService = new IncomeService(incomeEntityRepository);
    }

    @Test
    public void testCreateIncome() {
        IncomeEntity incomeEntity = new IncomeEntity();
        incomeEntity.setId(1L);
        when(incomeEntityRepository.save(incomeEntity)).thenReturn(incomeEntity);
        assertEquals(incomeEntity, incomeService.createIncome(incomeEntity));
    }

    @Test
    public void testGetIncome() {
        IncomeEntity incomeEntity = new IncomeEntity();
        incomeEntity.setId(1L);
        when(incomeEntityRepository.findById(1L)).thenReturn(Optional.of(incomeEntity));
        assertEquals(Optional.of(incomeEntity), incomeService.getIncome(1L));
    }

    @Test
    public void testUpdateIncome() {
        IncomeEntity incomeEntity = new IncomeEntity();
        incomeEntity.setId(1L);
        incomeEntity.setPlannedIncome(new BigDecimal("5000"));
        incomeEntity.setActualIncome(new BigDecimal("6000"));

        IncomeEntity updatedIncomeEntity = new IncomeEntity();
        updatedIncomeEntity.setId(1L);
        updatedIncomeEntity.setPlannedIncome(new BigDecimal("5000"));
        updatedIncomeEntity.setActualIncome(new BigDecimal("7000"));

        when(incomeEntityRepository.findById(1L)).thenReturn(Optional.of(incomeEntity));
        when(incomeEntityRepository.save(any(IncomeEntity.class))).thenReturn(updatedIncomeEntity);

        assertEquals(updatedIncomeEntity, incomeService.updateIncome(updatedIncomeEntity));
    }

    @Test
    public void testDeleteIncome() {
        doNothing().when(incomeEntityRepository).deleteById(1L);
        incomeService.deleteIncome(1L);
        verify(incomeEntityRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetAllIncomes() {
        IncomeEntity incomeEntity1 = new IncomeEntity();
        incomeEntity1.setId(1L);
        IncomeEntity incomeEntity2 = new IncomeEntity();
        incomeEntity2.setId(2L);
        when(incomeEntityRepository.findAll()).thenReturn(Arrays.asList(incomeEntity1, incomeEntity2));
        List<IncomeEntity> result = incomeService.getAllIncome();
        assertEquals(2, result.size());
    }
}