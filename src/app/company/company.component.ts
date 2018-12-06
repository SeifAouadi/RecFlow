import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: FormGroup;
  test: any;

  constructor(public apiService: ApiService, public fb: FormBuilder) {
    this.company = this.fb.group({
      Nom: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      adresse: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(1)]],
      facebook: ['', [Validators.required, Validators.minLength(1)]],
      tweeter: ['', [Validators.required, Validators.minLength(1)]],
      linkedin: ['', [Validators.required, Validators.minLength(1)]],
    });

  }

  ngOnInit() {
  }
  form(f) {
    if (f.valid) {
      this.test = {
        Nom: f.value.Nom,
        email: f.value.email,
        description: f.value.Description,
        adresse: f.value.adresse,
        phone: f.value.phone,
        socialLinks: [{
          facebook: f.value.facebook,
          tweeter: f.value.tweeter,
          linkedin: f.value.linkedin
        }]

      };
      this.apiService.formCompany(this.test).subscribe(res => {
        console.log(res);
      });
    }
  }
}
