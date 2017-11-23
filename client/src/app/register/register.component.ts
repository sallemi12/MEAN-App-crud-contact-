import { Component, OnInit } from '@angular/core';
import {RegisterService} from	'../services/register.service';
import {member} from './member'; 
import { FormGroup, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CustomFormsModule } from 'ng2-validation';
import { CustomValidators } from 'ng2-validation';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[RegisterService]
})
export class RegisterComponent implements OnInit {
   public options = {
        position: ["Top", "right"],
        
    };
  
  form: FormGroup;
  members:member[];
	member:member;
	username:string;
	email:string;
	password:string;
	password2:string;
  constructor( 
  private _registerService:RegisterService,
      private _flashMessage:FlashMessagesService,

       private _pushNotifications: NotificationsService,
       private _router: Router,

    

    ) { this.form = new FormGroup({
            field: new FormControl('', CustomValidators.email)
        });}
	ngOnInit() {
  			this._registerService.getMembers()
  	.subscribe(members => this.members=members);
  	}
  Register(){
  	

    const newMember=new member();
    newMember.username=this.username;
    newMember.email=this.email;
    newMember.password=this.password;
    newMember.password2=this.password2;
    // Required Fields
    if( this.email == undefined || this.username == undefined || this.password == undefined|| this.password2 == undefined){
        this._pushNotifications.error(
                  'oooops !!',
                  'Fill All Field Please',
                  
                  {
                     timeOut: 8000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                      animate:'scale',
                      icons:'error'
                  }
                );
      return false;
    }
    if(this.password !==this.password2){
     this._pushNotifications.error(
                  'oooops !!',
                  'Password not match',
                  
                  {
                     timeOut: 8000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                      animate:'scale',
                      icons:'error'
                  }
                );
      return false;
    }


    
    this._registerService.Register(newMember)
    .subscribe(member => {
      
       if(member.success){
         this._pushNotifications.success(
                  'Congratulation !',
                  member.msg,
                  
                  {
                     timeOut: 5000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                      animate:'scale',
                     
                  }
                );
             setTimeout((router: Router) => {
           this._router.navigate(['/login']);
        }, 5000);  //5s
         
        }else{
          this._pushNotifications.error(
                  'oooops !!',
                  member.msg,
                  
                  {
                     timeOut: 8000,
                      showProgressBar: true,
                      pauseOnHover: true,
                      clickToClose: true,
                      animate:'scale',
                      icons:'error'
                  }
                );
        }
     

    
    });

    this.username="";
    this.email="";
    this.password="";
    this.password2="";

  }
}
