import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expense } from 'src/app/models/expense.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';





@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {


  baseUrl = 'expense-service';

  @Input() 
  expenseModel: Expense = {};

  submitted = false;
  errorOccurred = false;
  errorMessage = "";
  saveBtnDisabled = "";
  isLoading = false;


  expenseForm:FormGroup;


  constructor(private fb:FormBuilder,private commonServices:CommonServiceService){
    this.expenseForm = this.fb.group({

      category:['',[Validators.required]],
      plannedExpenseAmount:[0,[Validators.required]],
      actualExpenseAmount:[0,[Validators.required]],
      expensedate:['',[Validators.required]],
      description:['',[Validators.required]]

    });

    this.submitted = false;
  }
  

updateExpense(){

  this.isLoading = true;
    this.saveBtnDisabled = "disabled";

  this.commonServices.put(this.baseUrl+"/api/expenses/" + this.expenseModel.id,this.expenseModel).subscribe({
    next: (res) => {
      
      console.log(res);

      this.submitted = true;
        this.errorOccurred = false;
        console.log("this.isLoading :: "+this.isLoading);
        
     
    }, error: (e) => {
      console.log(e.error);
      if(e.error.status == 500){
        this.errorMessage = "Something went wrong!"
      }else if(e.error.status == 403 || e.error.status == 401){
        this.errorMessage = "Unauthorised please login again!"
      }
      this.submitted = false;
      this.errorOccurred = true;
      this.isLoading = false;
      this.saveBtnDisabled = "";
      console.log("this.isLoading :: "+this.isLoading);
    },
    complete: () => {
      this.isLoading = false;
      this.saveBtnDisabled = "";
      console.log("this.isLoading :: "+this.isLoading);
      
     
    },
    
})

}

ngOnInit(): void {

  this.submitted = false;
    this.errorOccurred = false;
    this.isLoading = false;
   
}


}
