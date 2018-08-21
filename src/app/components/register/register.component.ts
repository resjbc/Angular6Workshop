import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { IRegisterComponent } from './register.interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { AccountService } from '../../shareds/services/account.service';
import { Router } from '@angular/router';
import { ValidatorService } from '../../shareds/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegisterComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private router: Router,
    private validator: ValidatorService
  ) {
    this.initialCreateFormData();
   }

  Url = AppURL;
  form: FormGroup;

  //ลงทะเบียน
  onSubmit() {
    if (this.form.invalid) 
    return this.alert.someting_wrong();
    
    //return alert('ข้อมูลบางอย่างไม่ถูกต้อง กรุณาลองอีกครั้ง');
    //console.log(this.form.value);
   // console.log(this.form.valid);

   //ส่งข้อมูลหา Server
   this.account
   .onRegister(this.form.value)
   .then(res => {
    this.router.navigate(['/', AppURL.Login]);
    this.alert.notify('ลงทะเบียนสำเร็จแล้ว', 'info');
    })
   .catch(err => this.alert.notify(err.Message));

   
  }

  private initialCreateFormData(){
     //สร้ามฟอร์ม
     this.form = this.builder.group({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required , Validators.email]],
      password: ['',[Validators.required, this.validator.isPassword]],
      cpassword: ['',[Validators.required , this.validator.comparePassword('password')]]
    });
  }


}
