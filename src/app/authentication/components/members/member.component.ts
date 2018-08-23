import { Component } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent } from './members.interface';
import { IAccount, IRoleAccount } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})

export class MemberComponent implements IMembersComponent {

  constructor(
    private member: MemberService,
    private alert: AlertService
  ) {
    this.initailLoadMembers();
  }

  items: IAccount[] = [];

  //แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  //ดึงข้อมูลสมาชิก
  private initailLoadMembers() {
    this.member
      .getMembers()
      .then(items => {
        this.items = items;
      })
      .catch(err => this.alert.notify(err.Message));
  }
}
