import { IRoleAccount } from "../../../shareds/services/account.service";
import { FormGroup } from "@angular/forms";

export interface IMemberCoponent {
    positionItem: string[];
    roleItem: IRoleAccount[];

    form: FormGroup;

    getRoleName(role: IRoleAccount): string;
    onSubmit(): void; 
    onConvertImage(input: HTMLInputElement);
}