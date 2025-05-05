import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(map(response => {
      if (response) {
        return true;
      } else {
        this.router.navigate(["login"]);
        return false;
      }
    }));
  }

}