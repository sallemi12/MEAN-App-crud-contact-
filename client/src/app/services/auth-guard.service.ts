// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginService, private router: Router) {}

  canActivate() {
    if(this.auth.loggedIn()) {
    	this.router.navigate(['/login']);
      return false;
    } else {
      
      return true;
    }
  }


}