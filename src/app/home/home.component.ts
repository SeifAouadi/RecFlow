import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
  import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toke;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
this.toke = this.apiService.decodetoken();
console.log(this.toke);
  }

}
