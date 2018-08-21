import { Injectable } from '@angular/core';
import { IRegister } from '../../components/register/register.interface';
import { ILogin } from '../../components/login/login.interface';



@Injectable()
export class AccountService  {

    private mockUserItems: IAccount[] = [
        {
            id: 1,
            firstname: "idres",
            lastname: "dulyakul",
            email: "idres@hotmail.com",
            password: "123456",
            position: "Frontend Developer",
            image: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg",
            created: new Date(),
            updated: new Date()

        },
        {
            id: 2,
            firstname: "lid",
            lastname: "dulyakul",
            email: "lid@hotmail.com",
            password: "123456",
            position: "Backend Developer",
            //image: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg",
            created: new Date(),
            updated: new Date()

        }
    ];

    //ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก token
    getUserLogin(accessToken: string) {
        return new Promise<IAccount>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(m => m.id == accessToken);
            if(!userLogin) return reject({Message: 'accessToken ไม่ถูกต้อง'});
            resolve(userLogin);
        });
    }

    //เข้าสู่ระบบ
    onLogin(model: ILogin){
        return new Promise<{ accessToken: string }>((resolve, reject) => {
            const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password);
            if(!userLogin) return reject({Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง'});
            resolve({
                accessToken: userLogin.id
            });
        });
    }

    //ลงทะเบียน
    onRegister(model: IRegister){
        //console.log(model||JSON)
        return new Promise((resolve , reject) => {
            model['id'] = Math.random();
            this.mockUserItems.push(model)
            resolve(model);
            //reject({'Message' : 'Error from server!'});
        });
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
    created?: Date,
    updated?: Date
}

