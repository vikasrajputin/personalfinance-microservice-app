package com.expense.repository;

import com.expense.entity.ExpenseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseEntityRepository extends JpaRepository<ExpenseEntity, Long> {
}