import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) {

    }

    private address: string = 'http://localhost:3000/';

    //ส่งข้อมูลแบบ Post method
    requestPost(url: string, body: any) {
        return this.http.post(`${this.address}${url}`,body);
    }
}