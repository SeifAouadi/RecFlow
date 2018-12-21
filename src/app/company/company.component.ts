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
  fileUpload: Array<File> = [];
  token;
  constructor(public apiService: ApiService, public fb: FormBuilder) {
    this.company = this.fb.group({
      Nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      Description: ['', [Validators.required, Validators.minLength(3)]],
      Adresse: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      facebook: ['', [Validators.required, Validators.minLength(3)]],
      tweeter: ['', [Validators.required, Validators.minLength(3)]],
      linkedin: ['', [Validators.required, Validators.minLength(3)]],
      pathPhoto: ['', [Validators.required, Validators.minLength(1)]],
    });

  }

  ngOnInit() {
   this.token = this.apiService.decodetoken();

  }
  formCompany(f) {
    if (f.valid) {
      this.test = {
        Nom: f.value.Nom,
        email: f.value.email,
        description: f.value.Description,
        adresse: f.value.Adresse,
        phone: f.value.phone,
        socialLinks: [{
          facebook: f.value.facebook,
          tweeter: f.value.tweeter,
          linkedin: f.value.linkedin
        }],
        pathPhoto: f.value.pathPhoto,
        user : this.token.data._id

      };
      console.log(this.test);
      this.apiService.formCompany(this.test, this.token.data._id).subscribe(res => {
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
