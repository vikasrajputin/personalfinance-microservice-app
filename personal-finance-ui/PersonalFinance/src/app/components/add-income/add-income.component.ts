import { Component , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Income } from './../../models/income.model';
import { IncomeService } from './../../services/income.service';
import { CommonServiceService } from 'src/app/services/common/common-service.service';




@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {


  baseUrl = 'income-service';
  submitted = false;
  errorOccurred = false;
  errorMessage = "";
  saveBtnDisabled = "";
  isLoading = false;

  income: Income = {};
  incomeForm: FormGroup;

  constructor(private fb: FormBuilder, private commonServices:CommonServiceService) {
    this.incomeForm = this.fb.group({
      sourceOfIncome: ['', [Validators.required]],
      plannedIncomeAmount: [0, [Validators.required]],
      incomeDate: ['', [Validators.required]],
      description: [''],
      actualIncomeAmount: [0, [Validators.required]]
    });
  }

  saveIncome(): void {
    this.isLoading = true;
    this.saveBtnDisabled = "disabled";
    this.commonServices.post(this.baseUrl+"/api/incomes",this.income ).subscribe({
      next: (res) => {
        this.submitted = true;
        this.errorOccurred = false;
      },
      error: (e) => {
        if(e.error.status == 500){
          this.errorMessage = "Something went wrong!"
        }else if(e.error.status == 403 || e.error.status == 401){
          this.errorMessage = "Unauthorised please login again!"
        }
        this.submitted = false;
        this.errorOccurred = true;
        this.isLoading = false;
        this.saveBtnDisabled = "";
      },
      complete: () => {
        this.isLoading = false;
        this.saveBtnDisabled = "";
      }
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.errorOccurred = false;
    this.isLoading = false;
  }
}