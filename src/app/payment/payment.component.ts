import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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
        this.toastr.success('Paiement réussi ! Votre commande a été passée.');
        this.cartService.clearCart();
        this.router.navigate(['/home']);
      }
    } else {
      this.toastr.error('Veuillez remplir tous les champs requis.');
    }
  }

  getTotal(): number {
    return this.total;
  }
}
