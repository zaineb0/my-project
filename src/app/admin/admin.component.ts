import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  allProducts: any[] = [];
  allUsers: User[] = [];

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAll();
    this.loadUsers();
  }

  loadAll(): void {
    this.productService.getAll().subscribe({
      next: (data: any[]) => {
        this.allProducts = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.allProducts = [];
      }
    });
  }

  loadUsers(): void {
    // Assuming AuthService has a method to get all users
    // For now, we'll access the private users array directly (in a real app, this would be an API call)
    this.allUsers = (this.authService as any).users || [];
  }

  delete(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadAll();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  deleteUser(email: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // Remove user from AuthService
      (this.authService as any).users = (this.authService as any).users.filter((u: User) => u.email !== email);
      this.loadUsers();
    }
  }
}
