import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { User } from './shared/models/user';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Manager';
  userInfo: User;

  constructor(
    private authService: AuthService, private userSvc: UsersService
  ) {
    this.userInfo = { email: "", password: '', first_name: '', last_name: '' };

    this.userSvc.me().subscribe(data => {
      this.userInfo = data;
    }, err => console.log(err));
  }

  get isAuthenticated(): boolean {
    return this.authService.checkAuthenticated();
  }

  logout() {
    this.authService.signOut();
  }

}
