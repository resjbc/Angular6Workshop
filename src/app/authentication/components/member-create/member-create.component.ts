import { Component, OnInit } from '@angular/core';
import { IMemberCoponent } from './member-create-interface';
import { IRoleAccount } from '../../../shareds/services/account.service';
import { SharedsService } from '../../../shareds/services/shareds.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements IMemberCoponent {

  constructor(
    private shareds: SharedsService,
    private builder: FormBuilder
  ) {
    this.positionItem = shareds.positionItem;
    this.initailFormData();
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
      email: [],
      password: [],
      firstname: [],
      lastname: [],
      position: [''],
      role: [''],
      image: []

    });
  }

  //บันทึกหรือแก้ไขข้อมูล
  onSubmit() {
    console.log(this.form.value);
  }


}
