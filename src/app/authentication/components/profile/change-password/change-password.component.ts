import { Component, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../shareds/services/alert.service';
import { ValidatorService } from '../../../../shareds/services/validators.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {

  constructor(
	  private builder: FormBuilder,
	  private alert: AlertService,
	  private validator: ValidatorService
  ) { 
	  this.initailCreateFormData();
  }

  @Input('modalRef') modalRef: BsModalRef;
  form: FormGroup;


  //เปลี่ยนรหัสผ่าน
  onSubmit() {
	  if(this.form.invalid)
		  return this.alert.someting_wrong();
	console.log(this.form.value);
  }
  
  // สร้ามฟอร์ม
  private initailCreateFormData() {
	  this.form = this.builder.group({
		  old_pass: ['', [Validators.required]],
		  new_pass: ['', [Validators.required, this.validator.isPassword]],
		  cnew_pass: ['', [Validators.required, this.validator.comparePassword('new_pass')]]
	  });
  }


}
