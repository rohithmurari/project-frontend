import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../../app/services/quiz.service';
import Swal from 'sweetalert2';
import { ViewQuizzesComponent } from '../../admin/view-quizzes/view-quizzes.component';
import { StartService } from '../../../services/start.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  catId:any;
  quizzes:any;
  code:any;
  id:any;
  u_id:any;
  u_data:any;
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _snack:MatSnackBar,
    private _router:Router,
    private _start:StartService,
    private _login:LoginService
    //private view_quiz:ViewQuizzesComponent
   
  ){}
  ngOnInit(): void {
    
    this._route.params.subscribe((params)=>{
      this.catId=params['catId'];
      if(this.catId==0){
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },(error)=>{
          this._snack.open("Error in loading data",'',{
            duration:3000
          });
        });
      }else{
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes=data;
        },(error)=>{
          alert('Error');
        });
      }
    });
    
  }

  quizCode(qid:any){
    Swal.fire({
      title: "Please enter the code to start",
      text: "Type the code shared by your instructor:",
      input:'text',
      confirmButtonColor:'#3085d6',
          
  }).then((result) => {
      if (result.value==qid) {
          this._router.navigate(['/user-dashboard/instructions/'+qid]);
      }
      else if(result.value!=qid){
        this._snack.open("Code entered is incorrect",'',{duration:3000});
      }
      
  });
  }

  // getUserId(){
    
  //   this._login.getCurrentUser().subscribe((data:any)=>{
  //     this.u_id=data.id;
  //     console.log("Inside func id "+JSON.stringify(this.u_id));
  //   });
    
  // }
  
  checkAttempts(qid:any,id:any){
   
    this.u_data= localStorage.getItem('user');
    this.u_data=JSON.parse(this.u_data)
    console.log(this.u_data.id);
    
    this._start.getAttemptsByUserAndQuiz(qid,this.u_data.id).subscribe((data:any)=>{
      // console.log(data[0].qAttempt);
      try{
        if(data[0].qAttempt<1 || data[0].qAttempt==null || data[0].qAttempt==0 || data==undefined){
        this.quizCode(qid);
      }
      else{
        //alert("Cannot attempt more than once");
        Swal.fire({
          title:'You cannot attempt quiz more than once',
          confirmButtonText:'OK',
          confirmButtonColor:'#3085d6',
          icon:'info'
        });
      }
      }catch(e:any){
        // console.log((e as Error).message);
        this.quizCode(qid);
      }
    });
  }

}
