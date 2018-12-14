import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token;

  constructor(private http: HttpClient) { }
  decodetoken() {
    this.token = localStorage.getItem('token');
    return jwt_decode(this.token);
  }

  loginApi(form) {
    return this.http.post('http://localhost:3000/login', form);
  }

  registerApi(data) {
    return this.http.post('http://localhost:3000/register', data);
  }
  formConsultant(data) {
    return this.http.post('http://localhost:3000/consultant', data);
  }
  uploadfile(file) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'form-data');
    return this.http.post('http://localhost:3000/upload', file, {headers} );
  }
   formCompany(data) {
     return this.http.post('http://localhost:3000/company', data);
   }

}
