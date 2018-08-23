import { IAccount, IRoleAccount } from "../../../shareds/services/account.service";
import { PageChangedEvent } from "ngx-bootstrap";

export interface IMembersComponent {
    items: IMember;

    //ส่วนของการค้นหา
    searchText: string;
    searchType: IMembersSearchKey;
    searchTypeItems: IMembersSearchKey[];
    onSearchItem(): void;

    //ส่วนของ pagination
    startPage: number;
    limitPage: number;
    onPageChanged(page: PageChangedEvent): void ;
    
    getRoleName(role: IRoleAccount): string;
}

export interface IMember {
    items: IAccount[];
    totalItems: number;
}

export interface IMembersSearch {
    searchText?: string;
    searchType?: string;

    startPage: number;
    limitPage: number;
}

export interface IMembersSearchKey {
    key: string;
    value: string;
}