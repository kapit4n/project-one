import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emailFormControl = new UntypedFormControl('', [
    Validators.required,
  ])

  constructor(private usrSvc: UsersService) { }

  onSubmit() {
    this.usrSvc.requestChangePasswordEmail({ email: this.emailFormControl.value }).subscribe(x => console.log(x));
  }

  ngOnInit(): void {
  }

}
