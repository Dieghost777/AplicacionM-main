import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formularioRegistro: FormGroup;

  constructor(
    private location: Location,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', Validators.required),
    });
  }

  async guardar() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        message: 'Por favor, completa correctamente el formulario.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const usuario = {
      nombre: f.nombre,
      correo: f.correo,
      contrasena: f.contrasena,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.authService.login(f.nombre, f.contrasena); // Iniciar sesión automáticamente después del registro

    const toast = await this.toastController.create({
      message: 'Usuario creado y autenticado correctamente',
      duration: 2000,
      position: 'top',
    });

    await toast.present();

    this.formularioRegistro.reset();
    this.router.navigate(['/datos-usuario']);
  }

  goBack() {
    this.location.back();
  }
}
