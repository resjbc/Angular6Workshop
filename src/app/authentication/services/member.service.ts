import { Injectable } from "@angular/core";
import { AccountService, IAccount } from "../../shareds/services/account.service";

@Injectable() 
export class MemberService {
    constructor(private account: AccountService)
   {}

    // ดึงข้อมูลสมาชิกทั้งหมด
    getMembers() {
        return new Promise<IAccount[]>((resolve , reject) => {
            resolve(this.account.mockUserItems);
        });
    }
}