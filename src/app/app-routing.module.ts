import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { CompanyComponent } from './company/company.component';
import {HomeComponent} from './home/home.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'consultant',
    component: ConsultantComponent
  },
  {
    path: 'company',
    component: CompanyComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
