import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import {member} from '../register/member'; 
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {
  authToken:any;
  user:any;
  constructor(private http: Http) { }
     	getMembers(){
  		return this.http.get('http://localhost:8000/member/members')
  		.map(res=>res.json());
  	}
  LogIn(user)
  {
  		var headers=new Headers();
  		headers.append('content-type','application/json');
  		return this.http.post('http://localhost:8000/member/login', user,{headers:headers}).map(res => res.json());
  }

  LogOut()
  {
  		this.authToken=null;
      this.user=null;
      localStorage.clear();
  	
  	
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('username',JSON.stringify(user.username));
    this.authToken=token;
    this.user=user;
  }
  loadToken(){
    const token=localStorage.getItem('id_token');
    this.authToken=token;
  }
 loggedIn() {
  return !tokenNotExpired('id_token');
  }

}
