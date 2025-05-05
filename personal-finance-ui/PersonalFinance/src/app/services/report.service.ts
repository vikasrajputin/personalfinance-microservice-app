import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonServiceService } from './common/common-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { Expense } from '../models/expense.model';

const baseUrl ='report-service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient,private commonServices:CommonServiceService) { }

  getAll(): Observable<any> {
    return this.commonServices.get(baseUrl+"/api/reports/expense");
  }

  getAllIncome():Observable<any>{
    return this.commonServices.get(baseUrl+"/api/reports/incomes");

  }

   getOverspending():Observable<any>{
     return this,this.commonServices.get(baseUrl+"/api/reports/overSpend")
   }

}
