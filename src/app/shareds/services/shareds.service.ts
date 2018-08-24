import { Injectable } from "@angular/core";

@Injectable()
export class SharedsService {
    //ตำแหน่งของสมาชิก
    positionItem: any[] = [
        'Frontend Developer',
        'Backend Developer'
    ];

    //แปลงไฟล์รูปเป็น Base64
    onConvertImage(input: HTMLInputElement) {
        return new Promise((resolve, reject) => {
            const imageTypes = ['image/jpeg', 'image/png'];
            const imageSize = 300;

            //หากไม่มีการอัพโหลดภาพ
            if (input.files.length == 0) return resolve(null);
            //ตรวจสอบชนิดไฟล์ที่อัพโหลดเข้ามา
            if (imageTypes.indexOf(input.files[0].type) < 0) {
                return reject({ Message: 'กรุณาอัพโหลดรูปภาพเท่านั้น' });
            }
            //ตรวจสอบขนาดของรูปภาพ
            if ((input.files[0].size / 1024) > imageSize)
                return reject({ Message: `กรุณาอัพโหลดข้อมูลไม่เกิน ${imageSize} KB` });

            const reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.addEventListener('load', () => resolve(reader.result));
        });
    }
}