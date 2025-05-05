import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    //this.isUserLoggedIn.next(true);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public removeUser(): void {
    //this.isUserLoggedIn.next(false);
    window.sessionStorage.removeItem(USER_KEY);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    return  (window.sessionStorage.getItem(USER_KEY) != null);
  }
}
