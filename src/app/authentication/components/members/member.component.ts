import { Component, ChangeDetectorRef } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMembersSearchKey, IMembersSearch, IMember } from './members.interface';
import { IAccount, IRoleAccount } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { PageChangedEvent, BsLocaleService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})

export class MemberComponent implements IMembersComponent {

  constructor(
    private member: MemberService,
    private alert: AlertService,
    private detect: ChangeDetectorRef,
    private router: Router,
    private localeService: BsLocaleService
  ) {
    //เปลี่ยน Datepicker เป็น ภาษาไทย 
    this.localeService.use('th');
    this.initailLoadMembers({
      startPage: this.startPage,
      limitPage: this.limitPage
    });

    //กำหนดค่าเริ่มต้น searchType
    this.searchType = this.searchTypeItems[0];
  }

  items: IMember;

  //ตัวแปรสำหรับค้นหา
  searchText: string = "";
  searchType: IMembersSearchKey;
  searchTypeItems: IMembersSearchKey[] = [
    { key: 'email', value: 'ค้นหาจากอีเมล์' },
    { key: 'firstname', value: 'ค้นหาจากชื่อ' },
    { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
    { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
    { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' },
    { key: 'updated', value: 'ค้นหาจากวันที่' },
  ];

  //ส่วนของ pagination
  startPage: number = 1;
  limitPage: number = 5;

  //เปลี่ยนหน้า pagination
  onPageChanged(page: PageChangedEvent) {
    this.initailLoadMembers({
      searchText: this.getsearchText,
      searchType: this.searchType.key,
      startPage: page.page,
      limitPage: page.itemsPerPage
    });
  }

  //ค้นหาข้อมูล
  onSearchItem() {
    this.startPage = 1;
    this.initailLoadMembers({
      searchText: this.getsearchText,
      searchType: this.searchType.key,
      startPage: this.startPage,
      limitPage: this.limitPage
    });

    //กระตุ้น Event
    this.detect.detectChanges();
    //console.log(this.searchType);
    //console.log(this.searchText);
  }

  //แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  // โหลดข้อมูลสมาชิก
  private initailLoadMembers(option?: IMembersSearch) {
    this.member
      .getMembers(option)
      .then(items => {
        this.items = items;
      })
      .catch(err => this.alert.notify(err.Message));
  }

  //ลบข้อมูลสมาชิก
  onDeleteMember(item: IAccount) {
    this.alert
      .confirm()
      .then(status => {
        if (status)
          this.member
            .deleteMember(item.id)
            .then(() => {
              //โหลด Member ใหม่
              this.initailLoadMembers({
                searchText: this.getsearchText,
                searchType: this.searchType.key,
                startPage: this.startPage,
                limitPage: this.limitPage
              });
              this.alert.notify('ลบข้อมูลสำเร็จ', 'info')
            })
            .catch(err => this.alert.notify(err.Message));
        else return;
      });
  }

  // แก้ไขข้อมูลสมาชิก
  onUpdateMember(item: IAccount) {
    this.router.navigate(['',
      AppURL.Authen, AuthURL.MemberCreate,
      //{ id: item.id }
      item.id
    ]);//, {queryParams: {id: item.id}});

  }

  //ตรวจสอบและรีเทินค่าค้นหา
  private get getsearchText() {
    let responeSearchText = null;
    switch (this.searchType.key) {
      case 'role':
        responeSearchText = IRoleAccount[this.searchText] || '';
        break;
      case 'updated':
        const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] } as any;
        searchDate.from.setHours(0);
        searchDate.from.setMinutes(0);
        searchDate.from.setSeconds(0);
        searchDate.to.setHours(23);
        searchDate.to.setMinutes(59);
        searchDate.to.setSeconds(59);
        responeSearchText = searchDate;
        break;
      default:
        responeSearchText = this.searchText;
        break;
    }
    return responeSearchText;
  }

}
