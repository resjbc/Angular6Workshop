import { Injectable } from "@angular/core";
import { AccountService, IAccount } from "../../shareds/services/account.service";
import { IMembersSearch } from "../components/members/members.interface";

@Injectable()
export class MemberService {
    constructor(private account: AccountService) { }

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
}