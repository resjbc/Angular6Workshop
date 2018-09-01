import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, ModalModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '../../../node_modules/@angular/forms';
import { AlertService } from './services/alert.service';
import { AccountService } from './services/account.service';
import { ValidatorService } from './services/validators.service';
import { SharedsService } from './services/shareds.service';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    FormsModule

  ],
  declarations: [AuthNavbarComponent, AuthSidebarComponent, AuthContentComponent],
  exports: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    BsDatepickerModule
  ],
  providers: [
    AlertService,
    //AccountService,
    SharedsService,
    ValidatorService
  ]
})
export class SharedsModule { }
