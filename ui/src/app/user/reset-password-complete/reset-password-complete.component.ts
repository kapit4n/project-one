import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MustMatch } from './password-match.validator';

interface IChangePasswordRequest {
  token: string;
  uidb64: string;
}

@Component({
  selector: 'app-reset-password-complete',
  templateUrl: './reset-password-complete.component.html',
  styleUrls: ['./reset-password-complete.component.css']
})
export class ResetPasswordCompleteComponent implements OnInit {
  token = '';
  uidb64 = '';
  url = '';
  submitted = false;

  changePasswordForm: UntypedFormGroup;

  constructor(private usrSvc: UsersService, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, private router: Router) { }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    const r = { token: this.token, password: this.changePasswordForm.value.password, uidb64: this.uidb64 };
 
    this.usrSvc.changePasswordComplete(r).subscribe(x => {
      this.router.navigate(['/login']);
    }, error => {
      console.error(error);
      alert(error.message);
    });
  }

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      password: ['', {validators: [Validators.required], updateOn: "blur"}],
      confirmPassword: ['', {validators: [Validators.required], updateOn: "blur"}]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })

    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      this.usrSvc.changePasswordRequest(this.url).subscribe((res: IChangePasswordRequest) => {
        this.token = res.token;
        this.uidb64 = res.uidb64;
      })
    })
  }

  get f() {
    return this.changePasswordForm.controls;
  }

}
