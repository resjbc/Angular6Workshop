import { Component, OnInit } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    if(this.form.invalid) return this.alert.someting_wrong();
   console.log(this.form.value);
  }

  //สร้างฟอร์ม
  initialCreateFormData(){
    this.form = this.build.group({
      email: [''],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      position: ['',Validators.required],
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

  //แปลงไฟล์รูปเป็น Base64
  onConvertImage(input: HTMLInputElement) {

    const imageControl = this.form.controls['image'];
    imageControl.setValue(null);

    if(input.files.length == 0) return;

    //ตรวจสอบชนิดไฟล์ที่อัพโหลดเข้ามา
    const imageTypes = ['image/jpeg', 'image/png'];
    if(imageTypes.indexOf(input.files[0].type) < 0){
      input.value = null;
      return this.alert.notify('กรุณาอัพโหลดรูปภาพเท่านั้น');
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      imageControl.setValue(reader.result);
    });
  }
}
