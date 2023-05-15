import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage = '';
  signUpForm: UntypedFormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validator: this.mustMatchPasswords('password', 'confirmPassword')
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      try {

        const pwd = this.signUpForm.get('password').value;
        const user: User = {
          email: this.signUpForm.get('email').value,
          password: this.signUpForm.get('password').value,
          first_name: this.signUpForm.get('firstName').value,
          last_name: this.signUpForm.get('lastName').value,
        };
        this.authService.signUp(user)
          .subscribe((resp: User) => {
            if (resp) {
              console.log('returned user: ', JSON.stringify(resp));
              this.authService.setUserData(resp);
            }
          });
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  signIn() {
    this.router.navigate(['/login']);
  }

  mustMatchPasswords(pwd, repeatPwd) {
    return (formGroup: UntypedFormGroup) => {
      const ctrl = formGroup.controls[pwd];
      const matchCtrl = formGroup.controls[repeatPwd];
      if (matchCtrl.errors && !matchCtrl.errors.mustMatch) {
        return;
      }

      if (ctrl.value !== matchCtrl.value) {
        matchCtrl.setErrors({ mustMatch: true });
      } else {
        matchCtrl.setErrors(null);
      }
    };
  }

  get form() { return this.signUpForm.controls; }

}
