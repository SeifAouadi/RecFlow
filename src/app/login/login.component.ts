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
  iduser;
  token;
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
        this.token = this.apiService.decodetoken();
        this.iduser = this.token.data._id;
         this.apiService.getCompany(this.iduser).subscribe(data => {
          if (data[0].comp === this.iduser) {
           /* this.router.navigateByUrl('test');*/
           console.log(data[0].comp);
          }
         });
         this.apiService.getFormConsultant(this.iduser).subscribe(data => {
           if (data[0].UserId === this.iduser) {
             console.log('qsdqsdqsdqs', data[0].UserId);
           }
         });
         /*this.router.navigateByUrl('/home');*/
       } else {
         this.message = res['message'];
         console.log(this.message);
       }
    });
  }
}
