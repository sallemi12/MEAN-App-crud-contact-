import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpModule } from '@angular/http';
import {contact} from '../dhashboard/contact'; 
import 'rxjs/add/operator/map';


@Injectable()
export class ContactService {

  constructor(public http: Http) { }

  getContacts()
  {
  	return this.http.get('http://localhost:8000/contact/contacts')
  	.map(res=>res.json());
  }
   addContact(newContact)
  {
  		var headers=new Headers();
  		headers.append('content-type','application/json');
  		return this.http.post('http://localhost:8000/contact/contact',newContact,{headers:headers}).map(res => res.json());
  }
  deleteContact(id)
  {
  		return	this.http.delete('http://localhost:8000/contact/contact/'+id).
  		map( res=> res.json());
  }
  UpdateContact(newContact)
  {
     var headers=new Headers();
      headers.append('content-type','application/json');
      return this.http.post('http://localhost:8000/contact/Updatecontact/'+newContact._id,newContact,{headers:headers}).map(res => res.json());
  }
  nbContacts()
  {
     return  this.http.get('http://localhost:8000/contact/contactsNumber').
      map( res=> res.json());
  }
}
