import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenService {
    private accesKey = 'accessToken';

    //กำหนดค่า access token ไว้ในความจำ browser
    setAuthenticated(accesToken: string) {
        localStorage.setItem(this.accesKey, accesToken);
    }

     //ดึงค่า access token ไว้ในความจำ browser ออกมา
    getAuthenticated(): string {
        return localStorage.getItem(this.accesKey);
    }

    //ล้างค่า access token ที่อยู่ในความจำ browser 
    clearAuthenticated(): void {
        localStorage.removeItem(this.accesKey);
    }
}