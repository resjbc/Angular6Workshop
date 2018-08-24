import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from "../../shareds/services/account.service";
import { IMembersSearch, IMember } from "../components/members/members.interface";

@Injectable()
export class MemberService {
    constructor(private account: AccountService) {
        if (account.mockUserItems.length <= 2)
            this.genaratedMember();
    }

    // ดึงข้อมูลสมาชิกทั้งหมด
    getMembers(option?: IMembersSearch) {
        return new Promise<IMember>((resolve, reject) => {
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
                    .filter(item => item[option.searchType].toString().toLowerCase()
                        .indexOf(option.searchText.toString().toLowerCase()) >= 0);
            }
            resolve({
                items: items.slice(
                    startItem, endItem
                ), totalItems: items.length
            });
        });
    }

    //จำลองข้อมูลสมาชิกเพื่อทำ pagenation
    private genaratedMember() {
        const position = ['Frontend Developer', 'Backend Developer'];
        const role = [IRoleAccount.Member, IRoleAccount.Admin, IRoleAccount.Employee];
        //this.account.mockUserItems.splice(2);
        for (let i = 3; i <= 100; i++) {
            this.account.mockUserItems.push({
                id: i.toString(),
                firstname: `Firstname ${i}`,
                lastname: `Lastname ${i}`,
                email: `mail-${i}@mail.com`,
                password: `123456`,
                position: position[Math.round(Math.random() * 1)],
                role: role[Math.round(Math.random() * 2)],
                created: new Date(),
                updated: new Date()
            });

        }
    }

    //เพิ่มข้อมูลสมาชิก
    createMember(model: IAccount) {
        return new Promise((resolve, reject) => {
            if (this.account.mockUserItems.find(item => item.email == model.email))
                return reject({ Message: 'อีเมล์นี้มีในระบบแล้ว' })
            model.id = Math.random();
            model.created = new Date();
            model.updated = new Date();
            this.account.mockUserItems.push(model);
            resolve(model);
        });
    }

    //ลบข้อมูลสมาชิก
    deleteMember(id: any) {
        return new Promise((reslove, reject) => {
            const findIndex = this.account.mockUserItems.findIndex(item => item.id == id);
            if (findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลนี้ในระบบ' });
            reslove(this.account.mockUserItems.splice(findIndex, 1));
        });
    }

}