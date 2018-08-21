import { FormGroup } from "@angular/forms";
import { TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";

export interface IProfileComponent {
    positionItem: any[];
    form: FormGroup;
    modalRef: BsModalRef; 
    onSubmit(): void;
    onConvertImage(input: HTMLInputElement): void;
    openModal(templete: TemplateRef<any>);
}

export interface IProfile {
    firstname: string;
    lastname:  string;
    position:  string;
    image:  string;
}