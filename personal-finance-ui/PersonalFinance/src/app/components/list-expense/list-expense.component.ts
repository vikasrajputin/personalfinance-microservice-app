import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense.model';
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';




@Component({
  selector: 'app-list-expense',
  standalone: true,
  imports: [NgIf,NgFor,EditExpenseComponent],
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.css'
})
export class ListExpenseComponent  implements OnInit{

  baseUrl = 'expense-service';
  expense: Expense[] = []
  deleted: boolean = false;
  errorOccurred: boolean = false;
  errorMessage: string = '';

constructor(private commonService:CommonServiceService){}

ngOnInit(): void {
 
this.commonService.get(this.baseUrl+"/api/expenses")
.subscribe(expense => {
  this.expense = expense;
});

}


deleteIncome(id:string){

this.commonService.delete(this.baseUrl+"/api/expenses/"+id).subscribe({
  next: (res) => {
    
  },
  error: (e) => {
    console.log(e.error);
    if(e.error.status == 500){
      this.errorMessage = "Something went wrong!"
    }else if(e.error.status == 403 || e.error.status == 401){
      this.errorMessage = "Unauthorised please login again!"
    }
    this.deleted = false;
    this.errorOccurred = true;
    alert(this.errorMessage);
  },
  complete: () => {
    this.deleted = true;
    this.commonService.get(this.baseUrl+"/api/expenses")
    .subscribe(expense => {
      this.expense = expense;
      
    });    
  }
});
}


}
