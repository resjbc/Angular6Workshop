import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from "../../shareds/services/account.service";
import { IMembersSearch, IMember } from "../components/members/members.interface";
import { HttpService } from "./http.service";
import { AuthenService } from "../../services/authen.service";
declare let $;

@Injectable()
export class MemberService {
    constructor(
        private account: AccountService,
        private http: HttpService,
        private authen: AuthenService) {
       /* if (account.mockUserItems.length <= 3)
            this.genaratedMember();*/
    }

    // ดึงข้อมูลสมาชิกทั้งหมด
    getMembers(option?: IMembersSearch) {
        return this.http
                   .requestGet(`api/member?${$.param(option)}`, this.authen.getAuthenticated())
                   .toPromise() as Promise<IMember>
        /*return new Promise<IMember>((resolve, reject) => {
            //เรียงลำดับข้อมูลจากวันแก้ไขล่าสุด
            let items = this.account.mockUserItems.sort((a1, a2) => {
                return Date.parse(a2.updated.toString()) - Date.parse(a1.updated.toString())
            });

            //คำนวณเรื่อง pagination
            const startItem = (option.startPage - 1) * option.limitPage;
            const endItem = option.startPage * option.limitPage;

            //หากมีการค้นหาข้อมูล
            if (option && option.searchText && option.searchType) {
                //ค้นหาข้มูลมาเก็บตัวแปร item
                items = this.account
                    .mockUserItems
                    .filter(item => {
                        switch (option.searchType) {
                            case 'updated':
                                return item.updated >= option.searchText['from'] && item.updated <= option.searchText['to'];
                            default:
                                return  item[option.searchType].toString().toLowerCase()
                                .indexOf(option.searchText.toString().toLowerCase()) >= 0
                        }
                    });
            }
            resolve({
                items: items.slice(
                    startItem, endItem
                ), totalItems: items.length
            });
        });*/
    }

    // ดึงข้อมูลสมาชิกแค่คนเดียว
    getMemberById(id) {
        return this.http
                   .requestGet(`api/member/${id}`,this.authen.getAuthenticated())
                   .toPromise() as Promise<IAccount>;
        /*return new Promise<IAccount>((resolve, reject) => {
            //เรียงลำดับข้อมูลจากวันแก้ไขล่าสุด
            const member = this.account
                .mockUserItems
                .find(item => item.id == id);
            if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' });
            resolve(member);
        });*/
    }

    //จำลองข้อมูลสมาชิกเพื่อทำ pagenation
    /*private genaratedMember() {
        const position = ['Frontend Developer', 'Backend Developer'];
        const role = [IRoleAccount.Member, IRoleAccount.Admin, IRoleAccount.Employee];
        //this.account.mockUserItems.splice(2);
        for (let i = 4; i <= 200; i++) {
            this.account.mockUserItems.push({
                id: i.toString(),
                firstname: `Firstname ${i}`,
                lastname: `Lastname ${i}`,
                email: `mail-${i}@mail.com`,
                password: `123456`,
                position: position[Math.round(Math.random() * 1)],
                role: role[Math.round(Math.random() * 2)],
                created: new Date(),
                updated: new Date(2018, 4, Math.round(Math.random() * 24 + 1))
            });

        }
    }*/

    //เพิ่มข้อมูลสมาชิก
    createMember(model: IAccount) {
        return this.http
                   .requestPost('api/member', model , this.authen.getAuthenticated())
                   .toPromise() as Promise<IAccount>;

       /* return new Promise<IAccount>((resolve, reject) => {
            if (this.account.mockUserItems.find(item => item.email == model.email))
                return reject({ Message: 'อีเมล์นี้มีในระบบแล้ว' })
            model.id = Math.random();
            model.created = new Date();
            model.updated = new Date();
            this.account.mockUserItems.push(model);
            resolve(model);
        });*/
    }

    //แก้ไขสมาชิก
    updateMember(id: any, model: IAccount) {
        return this.http
                   .requestPut(`api/member/${id}`, model , this.authen.getAuthenticated())
                   .toPromise() as Promise<IAccount>;
        /*return new Promise<IAccount>((resolve, reject) => {
            const member = this.account.mockUserItems.find(item => item.id == id);
            if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในะบบ' });

            //ตรวจสอบว่ามีเมล์นี้ในะบบ
            if (this.account.mockUserItems.find(item => {
                return item.email == model.email && model.email != member.email;
            })) return reject({ Message: 'มีอีเมล์นี้อยู่ในระบบแล้ว' });

            member.email = model.email;
            member.password = model.password || member.password; //หากไม่กรอก password ก็ใช้ตัวเดิม
            member.firstname = model.firstname;
            member.lastname = model.lastname;
            member.position = model.position;
            member.role = model.role;
            member.image = model.image;
            member.updated = new Date();
            resolve(member);
        });*/
    }

    //ลบข้อมูลสมาชิก
    deleteMember(id: any) {
        return this.http
                   .requestDelete(`api/member/${id}`,this.authen.getAuthenticated())
                   .toPromise() as Promise<number>;
        /*return new Promise((reslove, reject) => {
            const findIndex = this.account.mockUserItems.findIndex(item => item.id == id);
            if (findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลนี้ในระบบ' });
            reslove(this.account.mockUserItems.splice(findIndex, 1));
        });*/
    }

}