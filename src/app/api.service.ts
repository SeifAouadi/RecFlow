import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'form-data');
    return this.http.post('http://localhost:3000/upload', file, {headers} );
  }
}
