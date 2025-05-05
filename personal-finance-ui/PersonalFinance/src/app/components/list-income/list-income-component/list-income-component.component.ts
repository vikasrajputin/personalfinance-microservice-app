import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from 'src/app/services/common/common-service.service';
import { Observable } from 'rxjs';
import { Income } from 'src/app/models/income.model';



@Component({
  selector: 'list-income',
  templateUrl: './list-income-component.component.html',
  styleUrls: ['./list-income-component.component.css']
})
export class ListIncomeComponentComponent {

  baseUrl = 'income-service';

  incomes: Income[] = [];
  deleted:boolean = false;
  errorOccurred:boolean = false;
  errorMessage:string = '';

  constructor(private http: HttpClient, private commonService:CommonServiceService) { }

  ngOnInit(): void {
    this.commonService.get(this.baseUrl+"/api/incomes")
    .subscribe(income => {
      this.incomes = income;
    });
  }

  deleteIncome(id:string){
    this.commonService.delete(this.baseUrl+"/api/incomes/"+id).subscribe({
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
        this.commonService.get(this.baseUrl+"/api/incomes")
        .subscribe(income => {
          this.incomes = income;
        });    
      }
    });
  }
}
