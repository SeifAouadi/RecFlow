import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { COMMON_DEPRECATED_I18N_PIPES } from '@angular/common/src/pipes/deprecated';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  company: FormGroup;
  test: any;
  fileUpload: Array<File> = [];
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

  }
  formCompany(f) {
    if (f.valid) {
      this.test = {
        role: 'company',
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
        pathPhoto: f.value.pathPhoto

      };
      console.log(this.test);
      this.apiService.formCompany(this.test).subscribe(res => {
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
