import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../models/income.model';
import { CommonServiceService } from './common/common-service.service';

const baseUrl = 'income-service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient, private commonService:CommonServiceService) { }

  getAll(): Observable<Income[]> {
    return this.commonService.get(baseUrl+"/api/incomes");
  }

  get(id: any): Observable<Income> {

    return this.commonService.get(`${baseUrl}`+"/api/incomes"+`/${id}`);

    //return this.http.get<Income>(`${baseUrl}`+"/api/incomes"+`/${id}`);
  }

  create(data: any): Observable<any> {
    return this.commonService.post(baseUrl+"/api/incomes", data);
    // return this.http.post(baseUrl+"/api/incomes", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.commonService.put(`${baseUrl}`+"/api/incomes"+`/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.commonService.delete(`${baseUrl}`+"/api/incomes"+`/${id}`);
  }
}
