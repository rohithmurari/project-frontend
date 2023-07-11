import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { StartService } from 'src/app/services/start.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  qId: any;
  id:any;
  attempts: any[] = [];

  user=null;
  constructor(private login:LoginService,
    private _route:ActivatedRoute,
    private _snack:MatSnackBar,
    private _start:StartService,){}

  ngOnInit(): void {
    this.user=this.login.getUser();
    
    this.id=this.login.getUserId();


    this.qId=this._route.snapshot.params['quid'];
    
    this._start.getAttemptsByUser(this.id).subscribe((data:any)=>{
      console.log(data);
      this.attempts=data;
    },(error)=>{
      console.log(error);
    });
  }
}
