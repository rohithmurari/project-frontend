import { HttpClient } from '@angular/common/http';
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
  file: any;
  questions: any[] = [];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,
    private _http:HttpClient
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

  selectFile(event:any){
    // console.log(event);
    this.file=event.target.files[0];
    console.log("select file called")
    this.uploadFile();
  }

  uploadFile(){
    
    // Swal.fire({
    //   title: "Please Select the Excel file",
    //   input: 'file'
    // }).then((result)=>{
    //   this.selectFile
    // });
    
    let formData = new FormData();
    formData.append('file',this.file);

    this._question.uploadQuestion(formData).subscribe((data:any)=>{
      console.log(data);
      Swal.fire('Success','Questions uploaded successfuly','success');
    },(error)=>{
      console.log(error);
    });
  
  }

  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure you want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe((data:any)=>{
          this.questions=this.questions.filter((q)=>q.quesId!=qid);
          Swal.fire('Success','Question deleted successfuly','success');
        },(error)=>{
          Swal.fire('Error','Error in deleting questions','error');
          console.log(error);
        });
      }
          });
  }

}
