import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  message = '';
  showMessage = false;

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (!this.name || !this.email || !this.password) {
      this.displayMessage('Veuillez remplir tous les champs.');
      return;
    }
    if (!this.isPasswordValid(this.password)) {
      this.displayMessage('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.');
      return;
    }
    if (this.authService.register(this.name, this.email, this.password)) {
      this.displayMessage('Inscription réussie ! Redirection vers la connexion...');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.displayMessage('Email déjà utilisé.');
    }
  }

  displayMessage(msg: string) {
    this.message = msg;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  isPasswordValid(password: string): boolean {
    // Au moins 8 caractères, une majuscule, une minuscule et un chiffre
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
}
