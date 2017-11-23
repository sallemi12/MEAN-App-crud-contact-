import { Component, OnInit } from '@angular/core';
import {ContactService} from	'../services/contact.service';
import {contact} from './contact'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-dhashboard',
  templateUrl: './dhashboard.component.html',
  styleUrls: ['./dhashboard.component.css'],
  providers:[ContactService]
})
export class DhashboardComponent implements OnInit {
	contacts:contact[];
	contact:contact;
	first_name:string;
	last_name:string;
	phone:string;
  username:string;
  nb:number;
   public options = {
        position: ["middle", "right"],
        
    };
  constructor(private _contactService:ContactService, 
              private flashMessage:FlashMessagesService,
              private _pushNotifications: NotificationsService
              ) { }

  ngOnInit() {
    this._contactService.getContacts()
    	.subscribe(contacts => this.contacts=contacts);
    this._contactService.nbContacts()
      .subscribe(nbDocs => {this.nb=nbDocs});
      this.username=localStorage.getItem('username');
     
   
  }
  deleteContact(id:any){
    
    var contacts=this.contacts;
    this._contactService.deleteContact(id)
      .subscribe(data => {
        
          for (var i=0 ;i < contacts.length ;i++){
              if(contacts[i]._id == id){
                
                this.contacts.splice(i,1);
                this.nb=this.nb-1; 
               /* this.flashMessage.show(data.msg,{
                  cssClass:'alert-success',
                  timeout:5000
                });*/
                this._pushNotifications.error(
                  'Contact Deleted ',
                  'you are delete a contact',
                  
                  {
                     timeOut: 2000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                      animate:'scale',
                      icons:'error'
                  }
                );

               
              
                
              }
          };

        
       
        
    
        this._contactService.getContacts()
        .subscribe(contacts => this.contacts=contacts);
      })

   
  }
    
  
  
 addContact(){
 
    const newContact={
      first_name:this.first_name,
      last_name:this.last_name,
      phone:this.phone
    }
    if( this.first_name == undefined  || this.last_name == undefined || this.phone == undefined){
        this._pushNotifications.error(
                  'oooops',
                  'Fill All Field Please',
                  
                  {
                     timeOut: 2000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                      animate:'scale',
                      icons:'error'
                  }
                );
      return false;
    }
    this._contactService.addContact(newContact)
    .subscribe(contact => {
      this.contacts.push(contact);
     /* this.flashMessage.show(contact.msg,{
                  cssClass:'alert-success',
                  timeout:5000
                });*/

        if(contact.success){
        
       
      
        this._pushNotifications.success(
          'Contact Added ',
            contact.msg,

          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate:'scale',

          }
          );
        
      }else{
        this._pushNotifications.error(
          'oooops !!',
          contact.msg,

          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate:'scale',
            icons:'error'
          }
          );
       
      }
      this._contactService.getContacts()
    .subscribe(contacts => this.contacts=contacts);
    });

    this.first_name=" ";
    this.last_name=" ";
    this.phone=" ";
    this.nb=this.nb+1;


    
  }
  getContactForUpdate(id :any){
     var contacts=this.contacts;
    for (var i=0 ;i < contacts.length ;i++){
        if(contacts[i]._id == id){
            this.first_name=contacts[i].first_name;
            this.last_name=contacts[i].last_name;
            this.phone=contacts[i].phone;
    }

     
  }
}
 UpdateContact(id:any){
    
      
      
    const newContact={
      _id:id,
      first_name:this.first_name,
      last_name:this.last_name,
      phone:this.phone
    }

    
    this._contactService.UpdateContact(newContact)
    .subscribe(contact => {
      
     /* this.flashMessage.show(contact.msg,{
                  cssClass:'alert-success',
                  timeout:5000
                });*/
       this._pushNotifications.info(
                  'Contact Updated ',
                  'you are update a contact',
                  {
                      timeOut: 2000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true
                      
                  }
                );
      this._contactService.getContacts()
    .subscribe(contacts => this.contacts=contacts);
    });
     this.first_name=" ";
    this.last_name=" ";
    this.phone=" ";
             

        
  }

     

  

}
