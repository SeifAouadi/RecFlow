import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
  import { from } from 'rxjs';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toke;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit() {
this.guard();

  }
  guard() {
    this.toke = this.apiService.decodetoken();
    if (this.toke) {
      
      if (this.toke['data'].comp) {
        this.router.navigateByUrl('/test');
      } else if (this.toke['data'].cansul) {
        this.router.navigateByUrl('/profile');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
