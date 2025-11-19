import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  filteredProducts: any = [];
  categories: string[] = ['Électronique', 'Maison', 'livre', 'vetement', 'sport', 'jouet'];
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.filterProducts();
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product: any) => {
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm ||
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }

  addToCart(product: any) {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('Veuillez vous connecter pour ajouter des produits au panier.');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product);
    this.toastr.success('Produit ajouté au panier!');
  }
}
