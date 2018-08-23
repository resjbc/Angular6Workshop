import { Component, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../shareds/services/alert.service';
import { ValidatorService } from '../../../../shareds/services/validators.service';
import { AccountService } from '../../../../shareds/services/account.service';
import { AuthenService } from '../../../../services/authen.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {

  constructor(
	  private builder: FormBuilder,
	  private alert: AlertService,
    private validator: ValidatorService,
    private account: AccountService,
    private authen: AuthenService
  ) { 
	  this.initailCreateFormData();
  }

  @Input('modalRef') modalRef: BsModalRef;
  form: FormGroup;


  //เปลี่ยนรหัสผ่าน
  onSubmit() {
	  if(this.form.invalid)
      return this.alert.someting_wrong();
    this.account
        .onChangePassword(this.authen.getAuthenticated(), this.form.value)
        .then(user => {
          this.alert.notify('เปลี่ยนรหัสผ่านสำเร็จ', 'info');
          this.modalRef.hide();
          //console.log(user);
        })
        .catch(err => this.alert.notify(err.Message));
	
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
