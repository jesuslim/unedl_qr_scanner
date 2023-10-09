import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  formlogin: FormGroup;
  sesion: any;


  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
  ) {
    this.formlogin = this.formBuilder.group(
      {
        'Correo_Electronico': new FormControl("", Validators.required),
        'Contrasena': new FormControl("", Validators.required),
      }
    )
  }

  ngOnInit() {
    this.sesion = localStorage.getItem("ID_Usuario");
    if (this.sesion) {
      this.router.navigate(['menu/inicio']);
    }
  }

  async login(form: any) {
    if (this.formlogin.valid) {
      this.authService.loginAuth(form).subscribe(
        (response) => {
          localStorage.setItem("ID_Usuario", response['ID_Miembro']);
          this.formlogin.get('Correo_Electronico').reset();
          this.formlogin.get('Contrasena').reset();

          this.router.navigate(['menu/inicio']);
        },
        async (err) => {
          const alert = await this.alertController.create({
            header: 'Oops! Error',
            message: err.error.messages.error,
            buttons: ['Aceptar']
          });

          await alert.present();
          return;

        });
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      this.formlogin.markAllAsTouched();
      await alert.present();
      return;
    }

  }

  enter() {
    this.router.navigate(['menu/inicio']);
  }
}
