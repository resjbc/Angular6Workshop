import { Component, OnInit } from '@angular/core';
import { IMemberCoponent } from './member-create-interface';
import { IRoleAccount } from '../../../shareds/services/account.service';
import { SharedsService } from '../../../shareds/services/shareds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shareds/services/alert.service';
import { ValidatorService } from '../../../shareds/services/validators.service';
import { MemberService } from '../../services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCoponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private validator: ValidatorService,
    private member: MemberService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    /*this.activatedRouter.queryParams.forEach(queryParam => { 
      console.log(queryParam)
    });*/
    
    //console.log(this.activatedRouter.snapshot.queryParams);

    this.activatedRouter.params.forEach(Param => { 
      console.log(Param)
    });
  
    this.initailFormData();
    //เพิ่ม position
    this.positionItem = shareds.positionItem;
  }

  form: FormGroup;

  positionItem: any[] = [];
  roleItem: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Employee,
    IRoleAccount.Admin

  ];

  //แสดงสิทธิ์ข้อมูลผู้ใช้เป็นตัวหนังสือ
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role];
  }

  //สร้าง form
  private initailFormData() {
    this.form = this.builder.group({
      email: ['',[Validators.required , Validators.email]],
      password: ['',[Validators.required, this.validator.isPassword]],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      position: ['',Validators.required],
      role: ['',Validators.required],
      image: []
    });
  }

  //บันทึกหรือแก้ไขข้อมูล
  onSubmit() {
    if(this.form.invalid)
    return this.alert.someting_wrong();

    this.member
        .createMember(this.form.value)
        .then(res => {
          this.alert.notify('บันทึกข้อมูลสำเร็จ', 'info');
          this.router.navigate(['/',AppURL.Authen, AuthURL.Member]);
        })
        .catch(err => this.alert.notify(err.Message));
    //console.log(this.form.value);
  }

  //แสดงตัวอย่างภาพอัพโหลด
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
   
    this.shareds
        .onConvertImage(input)
        .then(base64 => {
          //console.log(base64);
          imageControl.setValue(base64)
        })
        .catch(err => {
          input.value = null;
          imageControl.setValue(null);
          this.alert.notify(err.Message);
        });
  }


}
