import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StartService } from '../../../services/start.service';

@Component({
  selector: 'app-view-attempts',
  templateUrl: './view-attempts.component.html',
  styleUrls: ['./view-attempts.component.css']
})
export class ViewAttemptsComponent implements OnInit {
  qId: any;
  attempts: any[] = [];
  constructor(
    private _route:ActivatedRoute,
    private _snack:MatSnackBar,
    private _start:StartService,
  ){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['quid'];
    
    this._start.getAttempts(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.attempts=data;
    },(error)=>{
      console.log(error);
    });
  }

}
