import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { from } from 'rxjs';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { throwIfEmpty } from 'rxjs/operators';
import {  Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  date = Date.now();
  selected;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(this.date);
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [];
  Token;
  experience: FormArray;
  formation: FormArray;
  fileUpload: Array<File> = [];
  consultant: FormGroup;
  test: any;
  skills = [];
  dureeExperience;
  phone;
  adresse;
  constructor(public apiService: ApiService, public router: Router) {
    this.consultant = new FormGroup({
      selected : new FormControl('', [Validators.required]),
      experience: new FormArray([this.createExp()]),
      formation: new FormArray([this.createFormation()]),
      phone: new FormControl('', [Validators.required,  Validators.minLength(8), Validators.maxLength(8)]),
      adresse: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
      imageUser: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit() {
    this.Token = this.apiService.decodetoken();
    console.log(this.Token);
    /*this.guard();*/
  }
  deleteRow2(index: number) {
    const control = <FormArray>this.consultant.controls['formation'];
    control.removeAt(index);
  }
  deleteRow(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.consultant.controls['experience'];
    // remove the chosen row
    control.removeAt(index);
}
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      if (this.fruits.length < 15) {
      this.fruits.push({ name: value.trim() });
      this.skills.push(value);
      }
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
      this.skills.splice(index, 1);
      console.log(this.skills);
    }
  }

  createExp(): FormGroup {
    return new FormGroup({
      societe: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
      debut: new FormControl('', [Validators.required]),
      fin: new FormControl('', [Validators.required]),
      tacheRealises: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
    });
  }
  createFormation(): FormGroup {
    return new FormGroup({
      institut: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
      diplome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
      debutF: new FormControl('', [Validators.required]),
      finF: new FormControl('', [Validators.required])
    });

  }
  addExp(): void {
    this.experience = this.consultant.get('experience') as FormArray;
    if (this.experience.length < 5) {
    this.experience.push(this.createExp());
    }

  }
  addFormation(): void {
    this.formation = this.consultant.get('formation') as FormArray;
    if (this.formation.length < 5) {
    this.formation.push(this.createFormation());
    }
  }
  form(f) {
   if (f.valid) {
      this.test = {
        role : 'consultant',
        domaine: f.value.selected,
        experience: f.value.experience,
        formation: f.value.formation,
        phone: f.value.phone,
        adresse: f.value.adresse,
        skill: this.skills,
        imagePath: f.value.imageUser,
        user: this.Token.data._id
      };
      console.log(this.test);
      this.apiService.formConsultant(this.test, this.Token.data._id).subscribe(res => {
        console.log(res);
        localStorage.clear();
        localStorage.setItem('token', res['Token']);
        });
        this.router.navigateByUrl('/profile');
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
  dateControl(f) {
    if ( f.value.debut < f.value.fin || f.value.debut === f.value.fin) {
      // tslint:disable-next-line:no-unused-expression
      return f.invalid;
      }
  }
  dateControl2(a) {
    if ( a.value.debutF < a.value.finF || a.value.debutF === a.value.finF) {
      // tslint:disable-next-line:no-unused-expression
      return a.invalid;
      }
  }
  guard() {
    this.Token = this.apiService.decodetoken();
    if (this.Token) {
      if (this.Token['data'].cansul) {
        this.router.navigateByUrl('/profile');
      } else if (this.Token['data'].comp) {
        this.router.navigateByUrl('/test');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }


  // Joi validator
}



