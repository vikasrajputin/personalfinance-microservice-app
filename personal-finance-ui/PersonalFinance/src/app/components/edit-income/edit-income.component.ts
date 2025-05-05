import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from 'src/app/models/income.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { IncomeService } from 'src/app/services/income.service';




@Component({
  selector: 'edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent {

  baseUrl = 'income-service';

  @Input() 
  incomeModel: Income = {};

  submitted = false;
  errorOccurred = false;
  errorMessage = "";
  saveBtnDisabled = "";
  isLoading = false;

  incomeForm: FormGroup;

  constructor(private fb: FormBuilder, private commonServices:CommonServiceService) {
    this.incomeForm = this.fb.group({
      sourceOfIncome: ['', [Validators.required]],
      plannedIncomeAmount: [0, [Validators.required]],
      incomeDate: ['', [Validators.required]],
      incomeCategory: ['', [Validators.required]],
      description: [''],
      isRecurring: [false],
      actualIncomeAmount: [0, [Validators.required]]
    });
    this.submitted = false;
  }

  updateIncome(): void {
    this.isLoading = true;
    this.saveBtnDisabled = "disabled";
    this.commonServices.put(this.baseUrl+"/api/incomes/" + this.incomeModel.id,this.incomeModel).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.errorOccurred = false;
        console.log("this.isLoading :: " + this.isLoading);
      },
      error: (e) => {
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
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.errorOccurred = false;
    this.isLoading = false;
  }
}
