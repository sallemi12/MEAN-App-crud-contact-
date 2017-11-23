import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TemplateComponent } from './template/template.component';
import {RouterModule,Routes} from '@angular/router';
import { DhashboardComponent } from './dhashboard/dhashboard.component';
import { HomeComponent } from './home/home.component';
import  {AuthGuard} from './services/auth-guard.service';
import  {LoginService} from './services/login.service';


const appRoutes: Routes = [

  {path:'register', component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DhashboardComponent,canActivate: [AuthGuard]},
  {path:'',component:HomeComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TemplateComponent,
    DhashboardComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,FormsModule,FlashMessagesModule,CustomFormsModule,RouterModule.forRoot(appRoutes),ReactiveFormsModule, FlashMessagesModule,SimpleNotificationsModule.forRoot()
  ],
  providers: [AuthGuard,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
