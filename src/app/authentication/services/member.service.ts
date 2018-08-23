import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from "../../shareds/services/account.service";
import { IMembersSearch } from "../components/members/members.interface";

@Injectable()
export class MemberService {
    constructor(private account: AccountService) {
        this.genaratedMember();
    }

    // ดึงข้อมูลสมาชิกทั้งหมด
    getMembers(option?: IMembersSearch) {
        return new Promise<IAccount[]>((resolve, reject) => {
            let items = this.account.mockUserItems;
            //หากมีการค้นหาข้อมูล
            if (option) {
                //ค้นหาข้มูลมาเก็บตัวแปร item
                items = this.account
                    .mockUserItems
                    .filter(item => item[option.searchType].toString().toLowerCase()
                        .indexOf(option.searchText.toString().toLowerCase()) >= 0);
            }
            resolve(items);
        });
    }

    //จำลองข้อมูลสมาชิกเพื่อทำ pagenation
    private genaratedMember() {
        const position = ['Frontend Developer', 'Backend Developer'];
        const role = [IRoleAccount.Member, IRoleAccount.Admin, IRoleAccount.Employee];
        for (let i = 3; i <= 333; i++) {
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

}