import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  paymentMethod: string = 'cash'; // 'cash' or 'online'
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService, private productService: ProductService
  ) {
    this.paymentForm = this.fb.group({
      // Delivery details
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      // Payment details (for online payment)
      cardNumber: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  ngOnInit(): void {
    this.total = this.cartService.getTotal();
  }

  onPaymentMethodChange(method: string): void {
    this.paymentMethod = method;
    if (method === 'online') {
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      this.paymentForm.get('expiryDate')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    } else {
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiryDate')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
    }
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiryDate')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      // Simulate payment processing
      const confirmed = confirm(`Confirmer le paiement de ${this.total} DT ?`);
      if (confirmed) {
        const cartItems = this.cartService.getCartItems();
        if (!cartItems || cartItems.length === 0) {
          this.toastr.error('Le panier est vide.');
          return;
        }

        // Récupérer les produits actuels pour vérifier le stock
        const productRequests = cartItems.map(item => this.productService.getById(item.id.toString()));
        forkJoin(productRequests).subscribe(products => {
          // Vérifier disponibilité
          for (let i = 0; i < products.length; i++) {
            const prod: any = products[i];
            const item = cartItems[i];
            if ((prod.stock ?? 0) < item.quantity) {
              this.toastr.error(`Stock insuffisant pour ${prod.title || 'le produit'}.`);
              return;
            }
          }

          // Construire les requêtes de mise à jour du stock
          const updateRequests = products.map((prod: any, idx: number) => {
            const item = cartItems[idx];
            const updated = { ...prod, stock: (prod.stock ?? 0) - item.quantity };
            return this.productService.updateProduct(prod.id.toString(), updated);
          });

          // Exécuter toutes les mises à jour puis vider le panier
          forkJoin(updateRequests).subscribe(() => {
            this.toastr.success('Paiement réussi ! Votre commande a été passée.');
            this.cartService.clearCart();
            this.router.navigate(['/home']);
          }, () => {
            this.toastr.error('Erreur lors de la mise à jour du stock.');
          });
        }, () => {
          this.toastr.error('Erreur lors de la récupération des produits.');
        });
      }
    } else {
      this.toastr.error('Veuillez remplir tous les champs requis.');
    }
  }

  getTotal(): number {
    return this.total;
  }
}
