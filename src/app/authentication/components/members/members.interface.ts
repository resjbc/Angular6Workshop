import { IAccount, IRoleAccount } from "../../../shareds/services/account.service";

export interface IMembersComponent {
    items: IAccount[];

    getRoleName(role: IRoleAccount): string;
}