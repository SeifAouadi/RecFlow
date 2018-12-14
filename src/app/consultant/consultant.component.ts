import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { from } from 'rxjs';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { throwIfEmpty } from 'rxjs/operators';
@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
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
  skills = [];
  dureeExperience;
  phone;
  adresse;
  constructor(public apiService: ApiService) {
    this.consultant = new FormGroup({
      experience: new FormArray([this.createExp()]),
      formation: new FormArray([this.createFormation()]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
      adresse: new FormControl('', [Validators.required, Validators.minLength(3)]),
      imageUser: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit() {
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
      this.fruits.push({ name: value.trim() });
      this.skills.push(value);
      console.log(this.skills);
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
      societe: new FormControl('', [Validators.required, Validators.minLength(3)]),
      debut: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fin: new FormControl('', [Validators.required, Validators.minLength(3)]),
      tacheRealises: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }
  createFormation(): FormGroup {
    return new FormGroup({
      institut: new FormControl('', [Validators.required, Validators.minLength(3)]),
      diplome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      debutF: new FormControl('', [Validators.required]),
      finF: new FormControl('', [Validators.required, Validators.minLength(3)])
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
        experience: f.value.experience,
        formation: f.value.formation,
        phone: f.value.phone,
        adresse: f.value.adresse,
        skill: this.skills,
        imagePath: f.value.imageUser
      };
      console.log(this.test);
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
  dateControl(f) {
    if ( f.value.debut > f.value.fin) {
      // tslint:disable-next-line:no-unused-expression
      return true;
      }
  }
  dateControl2(a) {
    if ( a.value.debutF > a.value.finF) {
      // tslint:disable-next-line:no-unused-expression
      return true;
      }
  }
}



