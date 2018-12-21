import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token;
  profile;
  profilecord;
  fakePath;
  constructor( public apiservice: ApiService, public router: Router) { }

  ngOnInit() {
    this.token = this.apiservice.decodetoken();
  this.guard();
    this.apiservice.getFormConsultant(this.token.data._id).subscribe(res => {
      this.profile = res;
    });
    this.apiservice.getcondidat(this.token.data._id).subscribe(res => {
      this.profilecord = [res];
    });

  }
  removeFakePath(f) {

    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
}
logOut() {
  localStorage.clear();
  this.router.navigateByUrl('/login');
}
guard() {

  if (this.token) {
    if (this.token['data'].comp) {
      this.router.navigateByUrl('/test');
    } else if (!this.token['data'].comp && !this.token['data'].cansul) {
      this.router.navigateByUrl('/home');
    }
  } else {
    this.router.navigateByUrl('/login');
  }
}
}
