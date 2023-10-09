import { Component, OnDestroy } from '@angular/core';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { AsistenciasService } from '../service/asistencias.service';
import { QrService } from '../service/qr.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  // https://www.npmjs.com/package/angularx-qrcode
  qrCodeString = '';
  scannedResult: any;
  content_visibility = '';
  user_id = localStorage.getItem("ID_Usuario");


  constructor(
    // private barcodeScanner: BarcodeScanner
    public alertController: AlertController,
    private asistensiaService: AsistenciasService,
    private qrCodeService: QrService
  ) {
  }

  // startScan() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedResult = barcodeData?.text;
  //    }).catch(err => {
  //        console.log('Error', err);
  //    });
  // }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);

        this.qrCodeService.getQrCode().subscribe(
          async (response) => {
            console.log(response[0].Codigo);
            this.qrCodeString = response[0].Codigo;
            const data = { ID_Miembro: this.user_id }

            if (this.scannedResult == this.qrCodeString) {
              this.asistensiaService.createAsistencias(data).subscribe(
                async (response) => {
                  const alert = await this.alertController.create({
                    header: 'Bienvenido!',
                    message: '¡Prepárate para entrenar!',
                    buttons: ['Aceptar']
                  });
                  await alert.present();
                }
              );

            } else {
              const alert = await this.alertController.create({
                header: 'Código no válido !',
                message: '¡Prueba de nuevo o busca a un entrenador!',
                buttons: ['Aceptar']
              });
              await alert.present();
            }
          }
        );
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}
