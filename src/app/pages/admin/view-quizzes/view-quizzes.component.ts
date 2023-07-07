import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
  quizzes=[
    
  ];
  random_number: any;
  //   {
  //   quid:23,
  //   title:'Basic Java Quiz',
  //   description:'It contains questions related to java language',
  //   maxMarks:'50',
  //   numberOfQuestions:'20',
  //   active:'',
  //   category:{
  //     title:'Programming',
  //   }
  // },{
  //   quid:2,
  //   title:'Basic Python Quiz',
  //   description:'It contains questions related to python language',
  //   maxMarks:'50',
  //   numberOfQuestions:'20',
  //   active:'',
  //   category:{
  //     title:'Programming',
  //   }
  // }


  constructor(private _quiz:QuizService){}
  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      this.random_number=Math.floor(Math.random()*(999-100+1)+100);
      console.log(this.quizzes);
      console.log(this.random_number);
    },(error)=>{
      console.log(error);
      Swal.fire({
        icon:'error',
        title:'Error in loading data',
        confirmButtonText:'OK',
        confirmButtonColor:'#3085d6',
        showCancelButton:false
      });
    });
  }

  deleteQuiz(quid:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure you want to delete the quiz?',
      confirmButtonText:'Delete',
      confirmButtonColor:'#3085d6',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(quid).subscribe((data)=>{
          this.quizzes=this.quizzes.filter((quiz)=>quiz['quid']!=quid);
          Swal.fire({
            icon:'success',
            title:'Successfully deleted the quiz',
            confirmButtonText:'OK',
            confirmButtonColor:'#3085d6',
            showCancelButton:false
          });
        },(error)=>{
          console.log(error);
          Swal.fire({
            icon:'error',
            title:'Error in deleting quiz',
            confirmButtonText:'OK',
            confirmButtonColor:'#3085d6',
            showCancelButton:false
          });
        });
      }
    });

   
  }
}
