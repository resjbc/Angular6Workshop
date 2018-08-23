import { BsModalRef } from "ngx-bootstrap";
import { FormGroup } from "@angular/forms";

export interface IChangePasswordComponent {
    modalRef: BsModalRef;
    form: FormGroup;

    onSubmit():void;
}

export interface IChangePassword {
    old_pass: string;
    new_pass: string;   
}