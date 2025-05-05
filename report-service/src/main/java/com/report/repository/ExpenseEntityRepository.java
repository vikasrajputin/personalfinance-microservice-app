package com.report.repository;

import com.report.entity.ExpenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseEntityRepository extends JpaRepository<ExpenseEntity, Long> {

    @Query(value = "SELECT category, " +
            "SUM(actual_expense) AS total_actual_expense, " +
            "SUM(planned_expense) AS total_planned_expense " +
            "FROM expense " +
            "GROUP BY category", nativeQuery = true)
    List<Object[]> getTotalByCategory();

    @Query(value = "SELECT description, planned_expense, actual_expense " +
            "FROM expense " +
            "WHERE actual_expense > planned_expense", nativeQuery = true)
    List<Object[]> getOverExpense();


}