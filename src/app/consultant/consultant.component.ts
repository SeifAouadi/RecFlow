import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { from } from 'rxjs';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [];
  experience: FormArray;
  formation: FormArray;
  fileUpload: Array<File> = [];
  consultant: FormGroup;
  test: any;
  dureeExperience;
  phone;
  adresse;
  skill;
  constructor(public apiService: ApiService) {
    this.consultant = new FormGroup({
      experience: new FormArray([this.createExp()]),
      formation: new FormArray([this.createFormation()]),
      phone: new FormControl('', [Validators.required, Validators.minLength(1)]),
      adresse: new FormControl('', [Validators.required, Validators.minLength(1)]),
      skill: new FormControl('', [Validators.required, Validators.minLength(1)]),
      dureeExperience: new FormControl('', [Validators.required, Validators.minLength(1)]),
      imageUser: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnInit() {
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  createExp(): FormGroup {
    return new FormGroup({
      societe: new FormControl('', [Validators.required, Validators.minLength(1)]),
      debut: new FormControl('', [Validators.required, Validators.minLength(1)]),
      fin: new FormControl('', [Validators.required, Validators.minLength(1)]),
      tacheRealises: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }
  createFormation(): FormGroup {
    return new FormGroup({
      institut: new FormControl('', [Validators.required, Validators.minLength(1)]),
      diplome: new FormControl('', [Validators.required, Validators.minLength(1)]),
      debutF: new FormControl('', [Validators.required, Validators.minLength(1)]),
      finF: new FormControl('', [Validators.required, Validators.minLength(1)])
    });

  }
  addExp(): void {
    this.experience = this.consultant.get('experience') as FormArray;
    this.experience.push(this.createExp());


  }
  addFormation(): void {
    this.formation = this.consultant.get('formation') as FormArray;
    this.formation.push(this.createFormation());
  }
  form(f) {
    if (f.valid) {
      this.test = {
        dureeExperience: f.value.dureeExperience,
        experience: f.value.experience,
        formation: f.value.formation,
        phone: f.value.phone,
        adresse: f.value.adresse,
        imagePath: f.value.imageUser
      };
      this.apiService.formConsultant(this.test).subscribe(res => {
        console.log(res);
      });
    }
  }

  filechangeEvent(fileInput: any) {
    this.fileUpload = <Array<File>>fileInput.target.files;
  }
  uploadFile() {
    const fba = new FormData();
    fba.append('file', this.fileUpload[0]);
    this.apiService.uploadfile(fba).subscribe(res => {
      console.log(res);
    });
  }
}



