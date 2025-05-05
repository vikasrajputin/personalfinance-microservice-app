package com.income.repository;

import com.income.entity.IncomeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeEntityRepository extends JpaRepository<IncomeEntity, Long> {
}