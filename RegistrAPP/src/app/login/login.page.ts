import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;

  constructor(
    private location: Location,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
    });
  }

  async ingresar() {
    const f = this.formularioLogin.value;
    const usuarioString = localStorage.getItem('usuario');
  
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
  
      console.log('Usuario en el localStorage:', usuario); // Mensaje de depuración
  
      if (usuario.nombre === f.nombre && usuario.contrasena === f.contrasena) {
        console.log('Credenciales coinciden.'); // Mensaje de depuración
  
        if (this.authService.login(f.nombre, f.contrasena)) {
          console.log('Inicio de sesión exitoso.'); // Mensaje de depuración
          this.router.navigate(['/datos-usuario']);
        } else {
          console.log('AuthService.login() devolvió falso.'); // Mensaje de depuración
        }
      } else {
        const alert = await this.alertController.create({
          message: 'Datos incorrectos y/o Usuario no encontrado.',
          buttons: ['OK'],
        });
  
        await alert.present();
        console.log('Credenciales incorrectas.'); // Mensaje de depuración
      }
    } else {
      const alert = await this.alertController.create({
        message: 'Usuario no encontrado.',
        buttons: ['OK'],
      });
  
      await alert.present();
      console.log('Usuario no encontrado en el localStorage.'); // Mensaje de depuración
    }
  }

  goBack() {
    this.location.back();
  }
}
