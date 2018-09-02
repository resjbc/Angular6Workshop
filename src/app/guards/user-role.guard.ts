import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRoleAccount, AccountService } from '../shareds/services/account.service';
import { AuthenService } from '../services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private authen: AuthenService,
    private account: AccountService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles: IRoleAccount[] = next.data.roles;
    console.log(roles);
    return false;
  }
}
