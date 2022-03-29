import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthFacade} from "../shared/services/auth.facade";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
  });

  constructor(private authFacade: AuthFacade) {}

  get username(): AbstractControl | null {
    return this.form.get('username');
  }

  get newPassword(): AbstractControl | null {
    return this.form.get('newPassword');
  }

  onSubmit(): void {
    if (this.username?.value && this.newPassword?.value) {
      this.authFacade.register(this.username.value, this.newPassword.value)
    }
  }
}
