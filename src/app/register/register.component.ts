import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ApiService} from '../api.service';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  firstnameValue = '';
  lastnameValue = '';
  emailValue = '';
  passwordValue = '';
  cpasswordValue = '';
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public router: Router) {
    this.registerForm = new FormGroup({
      firstnameValue: new FormControl('', [Validators.required]),
      lastnameValue: new FormControl('', [Validators.required]),
      emailValue: new FormControl('', [Validators.required, Validators.email]),
      passwordValue: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpasswordValue: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  passwordValueConfirm;
  ngOnInit() {
  }
  onSubmit() {

    // stop here if form is invalid
    if (this.registerForm.valid) {
      this.apiService.registerApi(this.registerForm.value).subscribe(res => {
        console.log(res);
        if (res['status'] === 200) {
           this.router.navigateByUrl('/login');
        } else if (res['status'] === 500) {
          alert('the email is already used');
        }
      });

    }

  }
}

