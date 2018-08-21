import { FormGroup } from "@angular/forms";

export interface IProfileComponent {
    positionItem: any[];
    form: FormGroup;
    onSubmit(): void;
    onConvertImage(input: HTMLInputElement): void;
}

export interface IProfile {
    firstname: string;
    lastname:  string;
    position:  string;
    image:  string;
}