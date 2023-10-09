import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'
import { EstadosService } from '../service/estados.service';
import { MunicipiosService } from '../service/municipios.service';
import { PerfilesService } from '../service/perfiles.service';
import { LicenciaturasService } from '../service/licenciaturas.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;

  estados: any[] = [];
  municipios: any[] = [];
  perfiles: any[] = [];
  option: any = '';
  licenciaturas: any[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private estadosService: EstadosService,
    private municipiosService: MunicipiosService,
    private perfilesService: PerfilesService,
    private licenciaturasService: LicenciaturasService,
    private alertController: AlertController,
    private usuariosService: UsuariosService,
    private router: Router,
  ) {
    this.registroForm = this.formBuilder.group(
      {
        'Nombre': new FormControl('', Validators.required),
        'Apellido_Paterno': new FormControl('', Validators.required),
        'Apellido_Materno': new FormControl('', Validators.required),
        'Matricula': new FormControl('', Validators.required),
        'ID_Perfil': new FormControl('', Validators.required),
        'ID_Licenciaturas': new FormControl('', Validators.required),
        'Genero': new FormControl('', Validators.required),
        'Fecha_Nacimiento': new FormControl('', Validators.required),
        'Correo_Electronico': new FormControl('', Validators.required),
        'ID_Estado': new FormControl('', Validators.required),
        'ID_Municipio': new FormControl('', Validators.required),
        'Colonia': new FormControl('', Validators.required),
        'Codigo_Postal': new FormControl('', Validators.required),
        'Entrenamiento': new FormControl(''),
        'Tipo_Entrenamiento': new FormControl(''),
        'Lesion': new FormControl(''),
        'Tipo_Lesion': new FormControl(''),
        'Objetivo': new FormControl(''),
        'Contrasena': new FormControl('', Validators.required),
      }
    )

  }

  ngOnInit() {
    this.findEstados();
    this.findPerfiles();
    this.findLicenciaturas();
  }

  findEstados() {
    this.estadosService.getEstados().subscribe((response) => {
      this.estados = response;
      console.log(this.estados);

    })
  }
  findMunicipios(estadoId: any) {

  }

  findPerfiles() {
    this.perfilesService.getPerfiles().subscribe((response) => {
      this.perfiles = response;
    });
  }

  setMunicipios() {
    this.option = document.getElementById('ID_Estado');
    const selectedEstado = this.option.value;
    // const selectedEstado = id
    console.log('parametro', selectedEstado)
    console.log('selectedEstado', selectedEstado);
    this.municipiosService.getMunicipiosByIdEstadoId(selectedEstado).subscribe((response) => {
      this.municipios = response;
      console.log(this.municipios);

    })

  }
  findLicenciaturas() {
    this.licenciaturasService.getLicenciatura().subscribe(
      (responce) => {
        this.licenciaturas = responce;
      });
  }

  async register(form: any) {

    if (this.registroForm.valid) {

      this.usuariosService.saveUsuario(form).subscribe(
        async (response) => {
          console.log('creado ', response);
          const alert = await this.alertController.create({
            header: 'Exito',
            message: 'Miembro registrado con exito',
            buttons: ['Aceptar']
          });

          await alert.present();
          this.router.navigate(['login']);
          return;
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
      this.registroForm.markAllAsTouched();
      await alert.present();
      return;
    }
    console.log(form);
  }

}
