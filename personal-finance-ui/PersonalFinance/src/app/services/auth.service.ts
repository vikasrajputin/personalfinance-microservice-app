import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
import { map, catchError } from 'rxjs/operators';
import { CommonServiceService } from './common/common-service.service';

const AUTH_API = 'auth-service/api/auth/';

const REFRESH_TOKEN_API = '/token/refresh';
const BEARER_PREFIX = 'Bearer ';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService, private commonService: CommonServiceService) { }

  getAccessToken() {
    return this.storageService.getUser() ? this.storageService.getUser().token : null;
  }


  login(username: string, password: string): Observable<any> {
    return this.commonService.post(
      AUTH_API + "login",
      {
        username,
        password,
      }
    );
  }

  isLoggedIn(): Observable<boolean> {

    if (this.getAccessToken()) {

      const headers = new HttpHeaders({
        'Authorization': BEARER_PREFIX + this.getAccessToken(),
        'Content-Type': 'application/json'
      });

      const options = {
        headers: headers
      };
      return this.http.get<any>(
        'http://localhost:8765/' + AUTH_API + 'validateToken',
        options
      ).pipe(map(response => {

        if (response.status == 'OK') {
          return true;
        } else {
          return false;
        }
      }),
        catchError(error => {
          return of(false);
        })

      );

    } else {
      return of(false);
    }
  }
}
