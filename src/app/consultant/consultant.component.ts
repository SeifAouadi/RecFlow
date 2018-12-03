import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  imageUser: File = null;
  consultant: FormGroup;
  test: any;
  dureeExperience;
  phone;
  adresse;
  skill;
  groupCV;
  constructor(public apiService: ApiService, public fb: FormBuilder) {
    this.consultant = this.fb.group({
      societe: ['', [Validators.required, Validators.minLength(1)]],
      debut: ['', [Validators.required, Validators.minLength(1)]],
      fin: ['', [Validators.required, Validators.minLength(1)]],
      tacheRealises: ['', [Validators.required, Validators.minLength(1)]],
      institut: ['', [Validators.required, Validators.minLength(1)]],
      diplome: ['', [Validators.required, Validators.minLength(1)]],
      debutF: ['', [Validators.required, Validators.minLength(1)]],
      finF: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(1)]],
      adresse: ['', [Validators.required, Validators.minLength(1)]],
      skill: ['', [Validators.required, Validators.minLength(1)]],
      dureeExperience: ['', [Validators.required, Validators.minLength(1)]],

    });
  }

  ngOnInit() {
  }
  form(f) {
    if (f.valid) {
      this.test = {
        dureeExprience: f.value.dureeExperience,

        experience: [{
          societe: f.value.societe,
          debut: f.value.debut,
          fin: f.value.fin,
          tacheRealises: f.value.tacheRealises,
        }],
        formation: [{
          institut: f.value.institut,
          diplome: f.value.diplome,
          debutF: f.value.debutF,
          finF: f.value.finF
        }],
        skill: [{
          technologie: f.value.skill
        }],
        phone: f.value.phone,
        adresse: f.value.adresse
      };
      this.apiService.formConsultant(this.test).subscribe(res => {
        console.log(res);
      });
    }
  }
}

