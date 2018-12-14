import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-consultant-list',
  templateUrl: './consultant-list.component.html',
  styleUrls: ['./consultant-list.component.css']
})
export class ConsultantListComponent implements OnInit {
  consultants = [];
  private filterPipe: FilterPipe;
  consultantFilter: any =
    {
      firstName: '',
      lastName: '',
      email: '',
      skill: ''
    };

  constructor(private router: Router, private api: ApiService, private filterPipe: FilterPipe) {
  }

  ngOnInit() {
    this.api.consultantList().subscribe(res => {
      if (res.json().length > 0) {
        this.consultants = this.filterPipe.transform(res.json(), this.consultantFilter);
      } else {
        console.log(res.json().length);
      }
    });
  }
}
