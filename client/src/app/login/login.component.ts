import { Component, OnInit } from '@angular/core';
import {LoginService} from	'../services/login.service';
import {member} from '../register/member'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
   public options = {
        position: ["Top", "right"],
        
    };
  
	members:member[];
	email:string;
	password:string;
	username:string;
  logged:boolean
  constructor(
  	private _loginService:LoginService,
    private _flashMessage:FlashMessagesService,
    private _pushNotifications: NotificationsService,
    private _router: Router,
    ) { }

  ngOnInit() {
    this._loginService.getMembers()
    .subscribe(members => this.members=members);
  }

  Login(){
    const user=new member();
    user.email=this.email;

    user.password=this.password;
    // Required Fields
    if( this.email == undefined  || this.password == undefined){
        this._pushNotifications.error(
                  'oooops !!',
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
    this._loginService.LogIn(user)
    .subscribe(res=>{

      if(res.success){
        
       
       this._loginService.storeUserData(res.token,res.user);
        this._pushNotifications.success(
          'Welocme To Your Dashboard !',
          'welcome'+' '+res.user.username,

          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate:'scale',

          }
          );
         setTimeout((router: Router) => {
           this._router.navigate(['/dashboard']);
        }, 2000);  //5s
        
      }else{
        this._pushNotifications.error(
          'oooops !!',
          res.msg,

          {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            animate:'scale',
            icons:'error'
          }
          );
        setTimeout((router: Router) => {
           this._router.navigate(['/login']);
        }, 2000);  //5s
        
      }



    }

    );

  }

}















