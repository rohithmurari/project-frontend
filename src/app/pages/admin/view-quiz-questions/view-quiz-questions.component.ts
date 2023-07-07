import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions: any[] = [];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar
  ){}
  ngOnInit(): void {
    this.qId=this._route.snapshot.params['quid'];
    this.qTitle=this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuestionOfQuiz(this.qId).subscribe((data:any)=>{
      console.log(data);
      this.questions=data;
    },(error)=>{
      console.log(error);
    });
  }

  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      confirmButtonColor:'#3085d6',
      title:'Are you sure you want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe((data:any)=>{
          this.questions=this.questions.filter((q)=>q.quesId!=qid);
          Swal.fire({
            icon:'success',
            title:'Successfully deleted the question',
            confirmButtonText:'OK',
            confirmButtonColor:'#3085d6',
            showCancelButton:false
          });
        },(error)=>{
          Swal.fire({
            icon:'error',
            title:'Error in deleting question',
            confirmButtonText:'OK',
            confirmButtonColor:'#3085d6',
            showCancelButton:false
          });
          console.log(error);
        });
      }
          });
  }

}
