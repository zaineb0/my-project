import { Injectable } from '@angular/core';
interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  bio: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { name: 'Admin', email: 'admin@admin.com', password: 'Admin123', role: 'admin', photo: 'https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png', bio: 'Administrateur système expérimenté avec plus de 10 ans d\'expérience.', phone: '+216 12 345 678', address: 'Tunis, Tunisie' },
    { name: 'Vendeur', email: 'vendeur@vendeur.com', password: 'Vendeur123', role: 'vendeur', photo: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg', bio: 'Vendeur passionné par les produits électroniques et les nouvelles technologies.', phone: '+216 98 765 432', address: 'Sfax, Tunisie' }
  ];
  private authenticated = false;
  private currentUser: User | null = null;

  constructor() {}

  login(email: string, password: string): string | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.authenticated = true;
      this.currentUser = user;
      return user.role;
    }
    return null;
  }

  register(name: string, email: string, password: string, role: string = 'user'): boolean {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    this.users.push({ name, email, password, role, photo: 'https://via.placeholder.com/150?text=User', bio: '', phone: '', address: '' });
    return true;
  }

  logout(): void {
    this.authenticated = false;
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.authenticated && this.currentUser?.role !== 'visitor';
  }

  getCurrentUserRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(u => u.email === updatedUser.email);
    if (index !== -1) {
      this.users[index] = updatedUser;
      if (this.currentUser && this.currentUser.email === updatedUser.email) {
        this.currentUser = updatedUser;
      }
    }
  }
}
