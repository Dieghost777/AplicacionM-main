import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  login(username: string, password: string): boolean {
    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
      const usuario = JSON.parse(storedUser);
      if (usuario.nombre === username && usuario.contrasena === password) {
        this.isLoggedIn = true;
        return true;
      }
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
