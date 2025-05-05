import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonServiceService } from './common/common-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { Expense } from '../models/expense.model';


const baseUrl = 'expense-service';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient,private commonServices:CommonServiceService) { }


  get(id: any): Observable<Expense> {

    return this.commonServices.get(`${baseUrl}`+"/api/expenses"+`/${id}`);

  }

  create(data: any): Observable<any> {
    return this.commonServices.post(baseUrl+"/api/expenses", data);
    
  }
  update(id: any, data: any): Observable<any> {
    return this.commonServices.put(`${baseUrl}`+"/api/expenses"+`/${id}`, data);
  }

 

}
