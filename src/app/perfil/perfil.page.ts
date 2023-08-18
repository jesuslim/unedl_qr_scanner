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
import { UsuariosService } from '../service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  miembroId: string = '';
  miembroInfo: any[] = [];
  estados: any[] = [];
  municipios: any[] = [];
  perfiles: any[] = [];
  option: any = '';
  licenciaturas: any[] = [];

  usuarioForm: FormGroup = new FormGroup({})

  constructor(
    public formBuilder: FormBuilder,
    private estadosService: EstadosService,
    private municipiosService: MunicipiosService,
    private perfilesService: PerfilesService,
    private licenciaturasService: LicenciaturasService,
    private alertController: AlertController,
    private usuariosService: UsuariosService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usuarioForm = new FormGroup({
      Nombre: new FormControl('', Validators.required),
      Apellido_Paterno: new FormControl('', Validators.required),
      Apellido_Materno: new FormControl('', Validators.required),
      Matricula: new FormControl('', Validators.required),
      ID_Perfil: new FormControl('', Validators.required),
      ID_Licenciaturas: new FormControl('', Validators.required),
      Genero: new FormControl('', Validators.required),
      Fecha_Nacimiento: new FormControl('', Validators.required),
      Correo_Electronico: new FormControl('', Validators.required),
      ID_Estado: new FormControl('', Validators.required),
      ID_Municipio: new FormControl('', Validators.required),
      Colonia: new FormControl('', Validators.required),
      Codigo_Postal: new FormControl('', Validators.required),
      Entrenamiento: new FormControl(''),
      Tipo_Entrenamiento: new FormControl(''),
      Lesion: new FormControl(''),
      Tipo_Lesion: new FormControl(''),
      Objetivo: new FormControl(''),
      ID_Miembro: new FormControl(''),
    });


    this.municipiosService.getMunipios().subscribe((response) => {
      this.municipios = response;
      console.log(this.municipios);

    })

    this.findMiembro();
    this.findEstados();
    this.findPerfiles();
    this.findLicenciaturas();
  }

  findMiembro() {
    console.log(' param ', this.miembroId);
    this.usuariosService.getUsuariosById(this.miembroId).subscribe((responce) => {
      this.miembroInfo = responce;
      console.log('miembro info ', this.miembroInfo[0]);
      this.usuarioForm.controls['Nombre'].setValue(this.miembroInfo[0].Nombre)
      this.usuarioForm.controls['Apellido_Paterno'].setValue(this.miembroInfo[0].Apellido_Paterno)
      this.usuarioForm.controls['Apellido_Materno'].setValue(this.miembroInfo[0].Apellido_Materno)
      this.usuarioForm.controls['Matricula'].setValue(this.miembroInfo[0].Matricula)
      this.usuarioForm.controls['ID_Perfil'].setValue(this.miembroInfo[0].ID_Perfil)
      this.usuarioForm.controls['ID_Licenciaturas'].setValue(this.miembroInfo[0].ID_Licenciaturas)
      this.usuarioForm.controls['Genero'].setValue(this.miembroInfo[0].Genero)
      this.usuarioForm.controls['Fecha_Nacimiento'].setValue(this.miembroInfo[0].Fecha_Nacimiento)
      this.usuarioForm.controls['Correo_Electronico'].setValue(this.miembroInfo[0].Correo_Electronico)
      this.usuarioForm.controls['ID_Estado'].setValue(this.miembroInfo[0].ID_Estado)
      this.usuarioForm.controls['ID_Municipio'].setValue(this.miembroInfo[0].ID_Municipio)
      this.usuarioForm.controls['Colonia'].setValue(this.miembroInfo[0].Colonia)
      this.usuarioForm.controls['Codigo_Postal'].setValue(this.miembroInfo[0].Codigo_Postal)
      this.usuarioForm.controls['Entrenamiento'].setValue(this.miembroInfo[0].Entrenamiento)
      this.usuarioForm.controls['Tipo_Entrenamiento'].setValue(this.miembroInfo[0].Tipo_Entrenamiento)
      this.usuarioForm.controls['Lesion'].setValue(this.miembroInfo[0].Lesion)
      this.usuarioForm.controls['Tipo_Lesion'].setValue(this.miembroInfo[0].Tipo_Lesion)
      this.usuarioForm.controls['Objetivo'].setValue(this.miembroInfo[0].Objetivo)
      this.usuarioForm.controls['ID_Miembro'].setValue(this.miembroInfo[0].ID_Miembro)

    });
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

  findLicenciaturas() {
    this.licenciaturasService.getLicenciatura().subscribe(
      (responce) => {
        this.licenciaturas = responce;
      });
  }

  setMunicipios() {
    this.option = document.getElementById('ID_Estado');
    const selectedEstado = this.option.value;
    console.log(selectedEstado);
    this.municipiosService.getMunicipiosByIdEstadoId(selectedEstado).subscribe((response) => {
      this.municipios = response;
      console.log(this.municipios);

    })

  }

  async update(form: any) {

    if (this.usuarioForm.valid) {

      this.usuariosService.updateUsuarios(form).subscribe(
        async (response) => {
          console.log('creado ', response);
          const alert = await this.alertController.create({
            header: 'Exito',
            message: 'Miembro registrado con exito',
            buttons: ['Aceptar']
          });

          await alert.present();
          this.router.navigate(['/menu/inicio']);
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
      this.usuarioForm.markAllAsTouched();
      await alert.present();
      return;
    }
    console.log(form);
  }

}
