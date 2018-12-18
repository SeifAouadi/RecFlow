import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
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
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getConsultant().subscribe(res => {
      console.log(res);
      this.resultant = res;
    });
  }
  filterConsultant(f: String) {
    this.Fil = this.resultant.filter(items => f === items.domaine);
    for (this.i = 0; this.i < this.Fil.length; this.i++) {
    this.apiService.getcondidat(this.Fil[this.i].UserId).subscribe(res => {
      console.log(res);
    });
  }
}
  getConsultant(faa) {
    this.apiService.getFormConsultant(faa).subscribe(res => {
      console.log(res);

    });
  }


}
