import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import {  Router } from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  resultant;
  Fil;
  experience;
  Informationtechnologie;
  i;
  candidat;
  fakePath: String;
  fake: String;
  view;
  name;
  token;
  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit() {
    this.guard();
    this.apiService.getConsultant().subscribe(res => {
      this.resultant = res;
     //  this.resultant = JSON.stringify(res);

    });
}
  filterConsultant(f: String) {

    this.Fil = this.resultant.filter(items => f === items.domaine);
    for (this.i = 0; this.i < this.Fil.length; this.i++) {
    this.apiService.getcondidat(this.Fil[this.i].user).subscribe(res => {
      this.candidat = [res];
    });
  }
}
  getConsultant(faa) {
    this.apiService.getFormConsultant(faa).subscribe(res => {
      console.log(res);
      this.view = res;
      this.apiService.getcondidat(faa).subscribe(name => {
         this.name = [name];
      });

    });
  }
  removeFakePath(f) {

  this.fakePath = f.slice(12, f.length);
  return this.fakePath;
}
guard() {
  this.token = this.apiService.decodetoken();
  if (this.token) {
if (this.token['data'].cansul) {
  this.router.navigateByUrl('/profile');
} else if (!this.token['data'].cansul && !this.token['data'].comp) {
  this.router.navigateByUrl('/home');
}
} else {
  this.router.navigateByUrl('/login');
}
}
logOut() {
  localStorage.clear();
  this.router.navigateByUrl('/login');
}
}
