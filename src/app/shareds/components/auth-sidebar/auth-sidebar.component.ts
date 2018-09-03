import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../../authentication/authentication.url';
import { IAuthSidebarComponent } from './auth.sidebar.interface';
import { AccountService, IRoleAccount, IAccount } from '../../services/account.service';
import { AuthenService } from '../../../services/authen.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
declare const App: any;

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})
export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {


  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router

  ) {
    this.initialLoadLogin()
  }

  ngOnInit() {
  }
  AppURL = AppURL;
  AuthURL = AuthURL;
  UserLogin: IAccount; //= {} as any;
  Role = IRoleAccount;

  //โหลดข้อมูล User ที่เข้าสู่ระบบ จาก token
  private initialLoadLogin() {

    this.UserLogin = this.account.UserLogin;
    if (this.UserLogin.id) return setTimeout(() => App.initialLoadPage(), 100);

    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => {
        this.UserLogin = userLogin;
        //โหลดข้อมูล Script สำหรับ sidebar
        setTimeout(() => App.initialLoadPage(), 100);

      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });

  }



}
