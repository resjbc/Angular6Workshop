import { Component } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMembersSearchKey, IMembersSearch } from './members.interface';
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
    //กำหนดค่าเริ่มต้น searchType
    this.searchType = this.searchTypeItems[0];
  }

  items: IAccount[] = [];

  //ตัวแปรสำหรับค้นหา
  searchText: string = "";
  searchType: IMembersSearchKey;
  searchTypeItems: IMembersSearchKey[] = [
    { key: 'email', value: 'ค้นหาจากอีเมล์' },
    { key: 'firstname', value: 'ค้นหาจากชื่อ' },
    { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
    { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
    { key: 'role', value: 'ค้นหาจากจากสิทธิ์ผู้ใช้' },
  ];

  //ค้นหาข้อมูล
  onSearchItem() {
    this.initailLoadMembers({
      searchText: this.searchType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText,
      searchType: this.searchType.key
    });
    //console.log(this.searchText,this.searchType);
  }

  //แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  //ดึงข้อมูลสมาชิก
  private initailLoadMembers(option?: IMembersSearch) {
    this.member
      .getMembers(option)
      .then(items => {
        this.items = items;
      })
      .catch(err => this.alert.notify(err.Message));
  }
}
