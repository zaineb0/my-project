import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  showMessage = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.email || !this.password) {
      this.displayMessage('Veuillez remplir tous les champs.');
      return;
    }

    const role = this.authService.login(this.email, this.password);
    if (role) {
      this.displayMessage(`Connexion ${role}...`);
      setTimeout(() => {
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'vendeur') {
          this.router.navigate(['/vendeur']);
        } else {
          this.router.navigate(['/home']);
        }
      }, 1000);
    } else {
      this.displayMessage('Email ou mot de passe incorrect.');
    }
  }

  visitShop() {
    this.authService.register('Visiteur', 'visitor@example.com', 'password', 'visitor');
    this.authService.login('visitor@example.com', 'password');
    this.router.navigate(['/home']);
  }

  displayMessage(msg: string) {
    this.message = msg;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}
