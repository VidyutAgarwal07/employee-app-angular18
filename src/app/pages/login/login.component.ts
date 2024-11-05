import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IloginInterface } from '../../model/interface/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);

  loginObj: IloginInterface = {
    username: '',
    password: '',
  }

  login() {
    console.log('username', this.loginObj.username);
    console.log('passsword', this.loginObj.password);
    if (this.loginObj.username === "" && this.loginObj.password === "") {
      this.router.navigateByUrl('dashboard');
    } else {
      alert('wrong credentials');
    }
  }

}
