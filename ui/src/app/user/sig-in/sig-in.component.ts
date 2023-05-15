import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

interface TokenRespI {
  token: string;
  access: string;
}

interface UserModel {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent implements OnInit {

  signInForm: UntypedFormGroup;

  constructor(private authService: AuthService,
    private userSvc: UsersService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const authValues = this.signInForm.value;
    this.authService.login(authValues).subscribe((res: TokenRespI) => {

      console.log(res);
      localStorage.setItem('token', res.access);
      this.userSvc.me().subscribe(data => {
        this.authService.setUserData(data);
        this.router.navigate(['home']);
      }, err => console.log(err)
      );
      // verify that we have a valid token

      // this.authToken = res.token
    }, error => {
      console.error(error);
    })
  }

}
