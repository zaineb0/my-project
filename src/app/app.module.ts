import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { VendeurComponent } from './vendeur/vendeur.component';
import { AdminComponent } from './admin/admin.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

// Services
import { ProductService } from './product.service';
import { SignupComponent } from './signup/signup.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ProfileVendeurComponent } from './profile-vendeur/profile-vendeur.component';

// Toastr
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    VendeurComponent,
    AdminComponent,
    ProductDetailsComponent,
    SignupComponent,
    ProfileAdminComponent,
    ProfileVendeurComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
