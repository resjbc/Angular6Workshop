import { IRoleAccount } from "../../../shareds/services/account.service";

export interface IMemberCoponent {
    positionItem: string[];
    roleItem: IRoleAccount[];

    getRoleName(role: IRoleAccount): string;
}