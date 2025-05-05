package com.report.repository;

import com.report.entity.IncomeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeEntityRepository extends JpaRepository<IncomeEntity, Long> {


    @Query(value = "SELECT source, " +
            "SUM(actual_income) AS total_actual_income, " +
            "SUM(planned_income) AS total_planned_income " +
            "FROM income " +
            "GROUP BY source", nativeQuery = true)
    List<Object[]> getTotalBySource();

}