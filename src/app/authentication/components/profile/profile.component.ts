import { Component, OnInit } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenService } from '../../../services/authen.service';
import { AccountService } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  constructor(
    private build: FormBuilder,
    private authen: AuthenService,
    private accout: AccountService,
    private alert: AlertService
    
  ) { 
    this.initialCreateFormData(); 
    this.initialLoadUpdateFormData();
  }

  form: FormGroup;

  positionItem: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ];

  //บันทึกข้อมูล
  onSubmit(){
   console.log(this.form.value);
  }

  //สร้างฟอร์ม
  initialCreateFormData(){
    this.form = this.build.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      position: [''],
      image: [null] 
    });

    //Disable อีเมล์
    this.form.get('email').disable();
  }

  //โหลดข้อมูลใหม่พร้อมกับ Update from date
  private initialLoadUpdateFormData() {
    this.accout
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['firstname'].setValue(user.firstname);
        this.form.controls['lastname'].setValue(user.lastname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
      })
      .catch(err => this.alert.notify(err.Message));
  }

}
