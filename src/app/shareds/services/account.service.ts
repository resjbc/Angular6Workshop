import { Injectable } from '@angular/core';
import { IRegister } from '../../components/register/register.interface';
import { ILogin } from '../../components/login/login.interface';
import { IProfile } from '../../authentication/components/profile/profile.interface';
import { IChangePassword } from '../../authentication/components/profile/change-password/change-password.interface';
import { HttpService } from '../../authentication/services/http.service';




@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private http: HttpService) {

    }

  /*  public mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: "Admin",
            lastname: "Admin",
            email: "admin@mail.com",
            password: "123456",
            position: "Frontend Developer",
            image: null,
            role: IRoleAccount.Admin,
            created: new Date(),
            updated: new Date()

        },
        {
            id: 2,
            firstname: "Employee",
            lastname: "Employee",
            email: "employee@mail.com",
            password: "123456",
            position: "Backend Developer",
            image: null,
            role: IRoleAccount.Employee,
            created: new Date(),
            updated: new Date()

        },
        {
            id: 3,
            firstname: "Member",
            lastname: "Member",
            email: "member@mail.com",
            password: "123456",
            position: "Backend Developer",
            image: null,
            role: IRoleAccount.Member,
            created: new Date(),
            updated: new Date()

        }
    ];*/

    // store user login ไว้
    public UserLogin: IAccount = {} as any;
    public setUserLogin(userLogin: IAccount) {
        this.UserLogin.id = userLogin.id;
        this.UserLogin.firstname = userLogin.firstname;
        this.UserLogin.lastname = userLogin.lastname;
        this.UserLogin.email = userLogin.email;
        this.UserLogin.position = userLogin.position;
        this.UserLogin.password = userLogin.password;
        this.UserLogin.image = userLogin.image;
        this.UserLogin.role = userLogin.role;
        this.UserLogin.created = userLogin.created;
        this.UserLogin.updated = userLogin.updated;
        return this.UserLogin;
    }

    //เปลี่ยนรหัสผ่านใหม่
    onChangePassword(accessToken: string, model: IChangePassword) {
        return this.http
                   .requestPost('api/member/change-password',model ,accessToken)
                   .toPromise() as Promise<IAccount>;
        /*return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(item => item.id == accessToken);
            if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
            if (userProfile.password != model.old_pass) return reject({ Message: 'รหัสผ่านเดิมไม่ถูกต้อง' });
            userProfile.password = model.new_pass;
            userProfile.updated = new Date();
            resolve(userProfile);
        });*/
    }

    //แก้ไขข้อมูลส่วนตัว Update Progile
    onUpdateProfile(accessToken: string, model: IProfile) {

        //console.log(model.image);
        if(!model.image)  {
            model.image = this.UserLogin.image.split('?')[0];
           // console.log(model.image);
        }
        //console.log(model.image);
        return (this.http
            .requestPost('api/member/profile', model, accessToken)
            .toPromise() as Promise<IAccount>)
            .then(user => this.setUserLogin(user));
        /*return new Promise((resolve, reject) => {
            const userProfile = this.mockUserItems.find(user => user.id == accessToken);
            if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' });
            userProfile.firstname = model.firstname;
            userProfile.lastname = model.lastname;
            userProfile.image = model.image;
            userProfile.position = model.position;
            userProfile.updated = new Date();
            resolve(userProfile);
        });*/
    }

    //ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก token
    getUserLogin(accessToken: string) {
        return (this.http
            .requestGet('api/member/data', accessToken)
            .toPromise() as Promise<IAccount>)
            .then(userLogin => this.setUserLogin(userLogin));
        /* return new Promise<IAccount>((resolve, reject) => {
             const userLogin = this.mockUserItems.find(m => m.id == accessToken);
             if(!userLogin) return reject({Message: 'accessToken ไม่ถูกต้อง'});
             resolve(userLogin);
         });*/
    }

    //เข้าสู่ระบบ
    onLogin(model: ILogin) {
        return this.http.requestPost('api/account/login', model)
            .toPromise() as Promise<{ accessToken: string }>;
        /* return new Promise<{ accessToken: string }>((resolve, reject) => {
             const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
             if(!userLogin) return reject({Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'});
             resolve({
                 accessToken: userLogin.id
             });
         });*/
    }

    //ลงทะเบียน
    onRegister(model: IRegister) {
        return this.http.requestPost('api/account/register', model)
            .toPromise() as Promise<IAccount>;
        /* return new Promise((resolve , reject) => {
             const _model: IAccount = model;
             _model.id = Math.random();
             _model.image = null;
             _model.position ='';
             _model.role = IRoleAccount.Member;
             _model.created = new Date();
             _model.updated = new Date();
             //console.log(model);
             this.mockUserItems.push(_model);
             resolve(_model);
             //reject({'Message' : 'Error from server!'});
         });*/
    }
}

export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;

    id?: any;
    position?: string;
    image?: string;
    role?
    created?: Date,
    updated?: Date
}

export enum IRoleAccount {
    Member = 1,
    Employee,
    Admin 
}



