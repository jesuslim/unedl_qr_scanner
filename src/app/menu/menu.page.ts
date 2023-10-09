import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  indiceSeleccionado: number = 0;

  paginas = [
    {
      titulo: 'Inicio',
      url: '/menu/inicio',
      icono: 'home'
    },
    // {
    //   titulo: 'Constancia',
    //   url: '/menu/asistencias',
    //   icono: 'book'
    // },
    // {
    //   titulo: 'Perfil',
    //   url: '/menu/perfil',
    //   icono: 'person'
    // }
  ]

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  cambiarIndiceSeleccionado(i: any) {
    this.indiceSeleccionado = i;
  }

  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Seguro te quieres salir?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        }, {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('ID_Usuario');
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();


  }


}
