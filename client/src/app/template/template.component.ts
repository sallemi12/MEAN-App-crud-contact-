import { Component, OnInit } from '@angular/core';
import {LoginService} from  '../services/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
    providers:[LoginService]
})
export class TemplateComponent implements OnInit {
	public options = {
        position: ["Top", "right"],
        
    };
  test:boolean;
  constructor(
  	private _loginService:LoginService,
    private _flashMessage:FlashMessagesService,
    private _pushNotifications: NotificationsService,
    private _router: Router,
    ) { }

  ngOnInit() {
  		
			 
	  }

	logout(){
		

		  this._loginService.LogOut();
		  this._pushNotifications.info(
          'You are logged out !',
          'See you soon',

          {
            timeOut: 3000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: true,
            animate:'scale',

          }
          );
       
       setTimeout((router: Router) => {
           this._router.navigate(['/login']);
        }, 3000);

		   
	  }
}
