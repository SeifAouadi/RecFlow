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
    if (localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    return jwt_decode(this.token);
    }
  }
  loginApi(form) {
    return this.http.post('http://localhost:3000/login', form);
  }

  registerApi(data) {
    return this.http.post('http://localhost:3000/register', data);
  }
  formConsultant(data, faa) {
    return this.http.post(`http://localhost:3000/consultant/${faa}`, data);
  }
  uploadfile(file) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'form-data');
    return this.http.post('http://localhost:3000/upload/', file, {headers} );
  }
   formCompany(data, faa) {
     return this.http.post(`http://localhost:3000/company/${faa}`, data);
   }
   getConsultant() {
     return this.http.get('http://localhost:3000/consultant');
   }
   getFormConsultant(faa) {
     return this.http.get(`http://localhost:3000/consultant/${faa}`);
   }
   getcondidat(f) {
     return this.http.get(`http://localhost:3000/condidat/${f}`);
   }
   getCompany(faa) {
     return this.http.get(`http://localhost:3000/company/${faa}`);
   }

}
