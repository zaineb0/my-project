import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent implements OnInit {
  myProducts: any[] = [];
  categories: string[] = ['Électronique', 'Maison', 'livre', 'vetement', 'sport', 'jouet'];
  newProduct = {
    title: '',
    description: '',
    price: 0,
    image: '',
    stock: 0,
    category: ''
  };

  isEditing: boolean = false;
  editingProduct: any = null;

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadMyProducts();
  }

  loadMyProducts(): void {
    this.productService.getAll().subscribe({
      next: (data: any[]) => {
        this.myProducts = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.myProducts = [];
      }
    });
  }

  addProduct(): void {
    if (!this.validateProduct()) {
      return;
    }

    if (this.isEditing) {
      this.productService.updateProduct(this.editingProduct.id, this.newProduct).subscribe({
        next: () => {
          this.loadMyProducts();
          this.cancelEdit();
          this.toastr.success('Produit modifié avec succès !');
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.loadMyProducts();
          this.resetForm();
          this.toastr.success('Produit ajouté avec succès !');
        },
        error: (error) => {
          console.error('Error adding product:', error);
        }
      });
    }
  }

  deleteProduct(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadMyProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }

  editProduct(product: any): void {
    this.isEditing = true;
    this.editingProduct = product;
    this.newProduct = { ...product };
  }

  private validateProduct(): boolean {
    if (!this.newProduct.title || !this.newProduct.description ||
        this.newProduct.price <= 0 || !this.newProduct.image ||
        this.newProduct.stock < 0 || !this.newProduct.category) {
      this.toastr.warning('Veuillez remplir tous les champs correctement, y compris la catégorie');
      return false;
    }
    return true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProduct = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.newProduct = {
      title: '',
      description: '',
      price: 0,
      image: '',
      stock: 0,
      category: ''
    };
  }
}
