import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import {member} from '../register/member'; 
import 'rxjs/add/operator/map';



@Injectable()
export class RegisterService {

  constructor(private http: Http) { }
  	getMembers(){
  		return this.http.get('http://localhost:8000/member/members')
  		.map(res=>res.json());
  	}
 
   Register(newMmeber)
  {
  		var headers=new Headers();
  		headers.append('content-type','application/json');
  		return this.http.post('http://localhost:8000/member/register',newMmeber,{headers:headers}).map(res => res.json());
  }

}
