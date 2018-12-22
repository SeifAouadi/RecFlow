import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile-c',
  templateUrl: './profile-c.component.html',
  styleUrls: ['./profile-c.component.css']
})
export class ProfileCComponent implements OnInit {
  token;
  profile;
  profilecord;
  fakePath;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit() {
    this.token = this.apiService.decodetoken();
    this.apiService.getCompany(this.token.data._id).subscribe(res => {
      this.profile = res;
    });
    this.apiService.getcondidat(this.token.data._id).subscribe(res => {
     this.profilecord = [res];
    });
    this.guard();
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  removeFakePath(f) {

    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
}
guard() {

  if (this.token) {
    if (this.token['data'].cansul) {
      this.router.navigateByUrl('/profile');
    } else if (!this.token['data'].comp && !this.token['data'].cansul) {
      this.router.navigateByUrl('/home');
    }
  } else {
    this.router.navigateByUrl('/login');
  }
}

}
