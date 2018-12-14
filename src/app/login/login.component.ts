import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
import { Route, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  message;
  imageUser: File = null;
  constructor(  public router: Router, public apiService: ApiService ) {  }
  ngOnInit() {
  }
  loginBtn() {
    const myObj = { email: this.email, password: this.password };
    this.message = '';
    this.apiService.loginApi(myObj).subscribe(res => {
      console.log('response', res);
       if (res['message'] === 'ok') {
         console.log(res['Token']);
         localStorage.setItem('token', res['Token']);
         this.router.navigateByUrl('/home');
       } else {
         this.message = res['message'];
         console.log(this.message);
       }
    });
  }
}
