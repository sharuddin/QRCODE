import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  qrData = 'https://lcsb.com.my';
  createdCode = null;
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas'



  constructor(private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery,
    private toastCtrl: ToastController) {

  }

  createCode() {
    this.createdCode = this.qrData;


  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }
  downloadQR() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
      console.log('data:', imageData)
    let data = imageData.split(',')[1];

    this.base64ToGallery.base64ToGallery(data,
      { prefix: '_img', mediaScanner: true})
      .then (async res =>{
          let toast = await this.toastCtrl.create({
           // header : 'QR Code save in your Photolibrary'
          });
          toast.present();
        }, err => console.log('err:', err)
        );

  }


}
