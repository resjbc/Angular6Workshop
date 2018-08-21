import { FormGroup } from "@angular/forms";

export interface IProfileComponent {
    positionItem: any[];
    form: FormGroup;
    onSubmit(): void;

}