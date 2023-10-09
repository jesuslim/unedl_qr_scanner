import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
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
        'Matricula': new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{2}[0-9]{7}$/)]),
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
        'ConfirmarContrasena': new FormControl('', Validators.required),

      },
      {
        // Validación personalizada para comparar la contraseña y la confirmación
        validators: this.passwordMatchValidator,
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

  // Función de validación personalizada para comparar contraseña y confirmación
  passwordMatchValidator(control: AbstractControl): { mismatch: boolean } {
    const password = control.get('Contrasena')?.value;
    const confirmPassword = control.get('ConfirmarContrasena')?.value;

    if (password !== confirmPassword) {
      return { mismatch: true };
    }

    return { mismatch: false };
  }

  limitarLongitudYNumeros(event: any) {
    const input = event.target;
    const inputValue = input.value;

    // Remover caracteres que no sean números
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Limitar la longitud a 5 caracteres
    const limitedValue = numericValue.slice(0, 5);

    // Actualizar el valor del campo
    input.value = limitedValue;

    // Actualizar el valor en el formulario (si es necesario)
    this.registroForm.get('Codigo_Postal')?.setValue(limitedValue);
  }

  validarNoNumerico(event: any) {
    const input = event.target;
    const inputValue = input.value;

    // Remover dígitos numéricos
    const nonNumericValue = inputValue.replace(/[0-9]/g, '');

    // Actualizar el valor del campo
    input.value = nonNumericValue;
  }

  async register(form: any) {

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
  }

}
