import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-vendeur',
  templateUrl: './profile-vendeur.component.html',
  styleUrls: ['./profile-vendeur.component.css']
})
export class ProfileVendeurComponent implements OnInit {
  currentUser: any;
  isEditing = false;
  profileForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      bio: [''],
      photo: ['']
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  startEditing() {
    this.isEditing = true;
    this.profileForm.patchValue({
      name: this.currentUser?.name,
      email: this.currentUser?.email,
      phone: this.currentUser?.phone,
      address: this.currentUser?.address,
      bio: this.currentUser?.bio,
      photo: this.currentUser?.photo
    });
  }

  cancelEditing() {
    this.isEditing = false;
    this.profileForm.reset();
  }

  onSave() {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.currentUser, ...this.profileForm.value };
      // Update the user in the auth service
      this.authService.updateUser(updatedUser);
      this.currentUser = updatedUser;
      this.isEditing = false;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.patchValue({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  goBack() {
    this.router.navigate(['/vendeur']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
