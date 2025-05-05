import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  baseUrl = 'http://localhost:8765/';
  constructor(private http: HttpClient, private storageService : StorageService) { }

  get(url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.get<any>(this.baseUrl+`${url}`, {headers});
  }

  post(url: string, data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.post(this.baseUrl+`${url}`, data, { headers});
  }

  put(url: string, data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.put(this.baseUrl+`${url}`, data, { headers});
  }

  delete(url: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.addAuthHeader(headers);
    return this.http.delete<any>(this.baseUrl+`${url}`, {headers});
  }

  private addAuthHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.storageService.getUser() ? this.storageService.getUser().token : null;
    if (token) {
      return headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
