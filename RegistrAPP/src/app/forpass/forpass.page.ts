import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forpass',
  templateUrl: './forpass.page.html',
  styleUrls: ['./forpass.page.scss'],
})
export class ForpassPage {
  correo: string = '';

  constructor(
    private location: Location,
    private alertController: AlertController,
    private router: Router
  ) {}

  verificarCorreo() {
    const correoIngresado = this.correo;

    const usuarioRegistradoString = localStorage.getItem('usuario');
    if (usuarioRegistradoString) {
      const usuarioRegistrado = JSON.parse(usuarioRegistradoString);
      if (usuarioRegistrado.correo === correoIngresado) {
        
        this.router.navigate(['/login']);
      } else {
        this.mostrarAlerta('El correo no está registrado en ninguna cuenta.');
      }
    } else {
      this.mostrarAlerta('El correo no está registrado en ninguna cuenta.');
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.location.back();
  }
}
