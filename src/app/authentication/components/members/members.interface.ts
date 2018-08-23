import { IAccount, IRoleAccount } from "../../../shareds/services/account.service";

export interface IMembersComponent {
    items: IAccount[];

    getRoleName(role: IRoleAccount): string;

    //ส่วนของการค้นหา
    searchText: string;
    searchType: IMembersSearchKey;
    searchTypeItems: IMembersSearchKey[];
    onSearchItem(): void;

}

export interface IMembersSearchKey {
    key: string;
    value: string;
}