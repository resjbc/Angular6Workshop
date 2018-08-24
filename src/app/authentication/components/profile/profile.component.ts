import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenService } from '../../../services/authen.service';
import { AccountService } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedsService } from '../../../shareds/services/shareds.service';

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
    private alert: AlertService,
    private modalService: BsModalService,
    private shareds: SharedsService

  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
    this.positionItem = this.shareds.positionItem;
  }

  form: FormGroup;
  modalRef: BsModalRef;

  positionItem: any[] = [];

  //บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return this.alert.someting_wrong();
    this.accout
      .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
      .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'info'))
      .catch(err => this.alert.notify(err.Message));
    // console.log(this.form.value);
  }

  //แปลงไฟล์รูปเป็น Base64
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
    
    this.shareds
        .onConvertImage(input)
        .then(base64 => imageControl.setValue(base64))
        .catch(err => {
          input.value = null;
          imageControl.setValue(null);
          this.alert.notify(err.Message);
        });
  }

  //เปิด Modal Dialog
  openModal(template: TemplateRef<any>) {
    //console.log(this);
    this.modalRef = this.modalService.show(template);
  }

  //สร้างฟอร์ม
  initialCreateFormData() {
    this.form = this.build.group({
      email: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      image: [null]
    });

    //Disable อีเมล์
    this.form.get('email').disable();
  }

  //โหลดข้อมูลใหม่พร้อมกับ Update FORM date
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
