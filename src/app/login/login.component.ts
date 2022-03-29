import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthFacade} from "../shared/services/auth.facade";
import {TokenStorageService} from '../shared/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('test123', Validators.required),
    currentPassword: new FormControl('test123', Validators.required),
  });

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  get currentPassword(): AbstractControl | null {
    return this.form.get('currentPassword');
  }

  ngOnInit(): void {
    if (this.tokenStorageService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    if (this.username?.value && this.currentPassword?.value) {
      this.authFacade.login(this.username.value, this.currentPassword.value);
    }
  }
}
