import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'marketplace';
  showNavbar = false;
  cartItemCount = 0;
  userRole: string | null = null;
  isAuthenticated = false;
  categories: string[] = ['Électronique', 'Maison', 'livre', 'vetement', 'sport', 'jouet'];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.showNavbar = !event.url.includes('/login') && !event.url.includes('/signup') && !event.url.includes('/admin') && !event.url.includes('/vendeur') && !event.url.includes('/profile-admin') && !event.url.includes('/profile-vendeur');
          this.userRole = this.authService.getCurrentUserRole();
          this.isAuthenticated = this.authService.isAuthenticated();
        })
    );

    this.subscriptions.add(
      this.cartService.cart$.subscribe((items: any[]) => {
        this.cartItemCount = this.cartService.getItemCount();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
