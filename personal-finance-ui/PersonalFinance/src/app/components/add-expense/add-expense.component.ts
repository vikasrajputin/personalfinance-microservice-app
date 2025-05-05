import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { data } from 'highcharts';
import { Expense } from 'src/app/models/expense.model'
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { ExpenseService } from 'src/app/services/expense.service';



@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-expense.component.html',
})
export class AddExpenseComponent implements OnInit {

   baseUrl = 'expense-service';

  expense: Expense = {};

  submitted = false;
  errorOccurred = false;
  errorMessage = "";
  saveBtnDisabled = "";
  isLoading = false;


  expenseForm: FormGroup;


  constructor(private fb: FormBuilder, private commonServices: CommonServiceService) {
    this.expenseForm = this.fb.group({

      category: ['', [Validators.required]],
      plannedExpenseAmount: [0, [Validators.required]],
      actualExpenseAmount: [0, [Validators.required]],
      expensedate: ['', [Validators.required]],
      description: ['']

    });
  }


  saveExpense() {

    this.isLoading = true;
    this.saveBtnDisabled = "disabled";

    this.commonServices.post(this.baseUrl + "/api/expenses", this.expense).subscribe({
      next: (res) => {

        console.log(res);

        this.submitted = true;
        this.errorOccurred = false;
        console.log("this.isLoading :: " + this.isLoading);

      }, error: (e) => {
        console.log(e.error);
        if (e.error.status == 500) {
          this.errorMessage = "Something went wrong!"
        } else if (e.error.status == 403 || e.error.status == 401) {
          this.errorMessage = "Unauthorised please login again!"
        }
        this.submitted = false;
        this.errorOccurred = true;
        this.isLoading = false;
        this.saveBtnDisabled = "";
        console.log("this.isLoading :: " + this.isLoading);
      },
      complete: () => {
        this.isLoading = false;
        this.saveBtnDisabled = "";
        console.log("this.isLoading :: " + this.isLoading);
      }
    })

  }

  ngOnInit(): void {

    this.submitted = false;
    this.errorOccurred = false;
    this.isLoading = false;

  }



}