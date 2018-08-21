import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { Router } from '@angular/router';
import { AuthURL } from '../../authentication/authentication.url';
import { AccountService } from '../../shareds/services/account.service';
import { AuthenService } from '../../services/authen.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService
  ) { 
    this.initailCreateFromData()
   // console.log(this.authen.getAuthenticated());
  }

  Url = AppURL;
  form;
 
  //เข้าสู่ระบบ
  onSubmit(): void {
      if(this.form.invalid)
          return this.alert.someting_wrong();
        this.account
          .onLogin(this.form.value)
          .then(res => {
            //console.log(res);
             //เก็บ session
             this.authen.setAuthenticated(res.accessToken)
             // alert และ redirec หน้า
             this.alert.notify('เข้าสู่ระบบสำเร็จ','info');
             this.router.navigate(['/', AppURL.Authen, AuthURL.Dashboard]);
          })
          .catch(err => this.alert.notify(err.Message));
    
  }

  // สร้าง ฟอร์ม
  private initailCreateFromData() {
    this.form = this.builder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      remember: [true]
    });
  }
}
