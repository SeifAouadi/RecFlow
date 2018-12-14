import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SliderComponent } from './slider/slider.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { Control } from './control' ;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SliderComponent,
    ConsultantComponent,
    HomeComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Control
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
