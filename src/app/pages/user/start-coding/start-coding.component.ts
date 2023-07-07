import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { StartService } from 'src/app/services/start.service';
import Swal from 'sweetalert2';
import { StartComponent } from '../start/start.component';
import { browserRefresh } from 'src/app/app.component'

@Component({
  selector: 'app-start-coding',
  templateUrl: './start-coding.component.html',
  styleUrls: ['./start-coding.component.css']
})
export class StartCodingComponent implements OnInit {
  currentUser:any;
  userid:any;
  currentQuiz:any;
  qid:any;
  questions:any;
  marksGot:any;
  correctAnswers:any;
  attempted:any;
  isSubmit=false;
  timer:any;
  showResult:any;
  isCoding=false;

  color: ThemePalette = 'warn';

  resultData={
   
    attempted:'',
    correctAnswers:'',
    marksGot:'',
    quiz:{quid:''},
    user:{id:''},
    qAttempt:0,
  };

  // quizData={
  //   title:'',
  //   description:'',
  //   maxMarks:'',
  //   numberOfQuestions:'',
  //   active:true,
  //   showResult:true,
  //   category:{
  //     cid:'',
  //   }
  // };
  browserRefresh:any;
  

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _login:LoginService,
    private _quiz:QuizService,
    private _start:StartService,
    public _startest:StartComponent
  ){}
  ngOnInit(): void {
    
    this.qid=this._route.snapshot.params['quid'];
   //this.preventBackButton();
   this.loadQuestions();
   
   this._login.getCurrentUser().subscribe((data:any)=>{
    this.resultData.user.id=data.id;
  });

  this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
    this.resultData.quiz.quid=data.quid;
  });

  this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
    this.showResult = Boolean(data.showResult);
    // console.log(this.showResult);
  });


  this.browserRefresh = browserRefresh;
    //console.log('refreshed?:', browserRefresh);
    // alert('you cheater, stop refreshing')
    if(browserRefresh){
      this.refreshButton();
    }

  }



  loadQuestions() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe((data:any)=>{
    this.questions=data;
    console.log(data);
    this.timer=this.questions.length*10*60;
    // this.questions.forEach((q:any)=>{
    //   q['givenAnswer']="";
    // });
    this.startTimer();
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
  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
      title:'Are you sure you want to submit the quiz?',
      showCancelButton:true,
      confirmButtonText:'Submit',
      confirmButtonColor:'#3085d6',
      denyButtonText:'No',
      icon:'question'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
      console.log("Correct "+this.correctAnswers);
      console.log("Marks "+this.marksGot);
    });
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let hh=Math.floor(this.timer/3600);
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return hh+" hr: "+mm+" min: "+ss+" sec";
  }


  refreshButton(){
        Swal.fire({
          title:'You lost all your data',
          showCancelButton:false,
          confirmButtonText:'OK',
    confirmButtonColor:'#3085d6',
          denyButtonText:'No',
          icon:'info'
        }).then((e)=>{
          if(e.isConfirmed){
            this.evalQuiz();
          }
    //       console.log("Correct "+this.correctAnswers);
    //       console.log("Marks "+this.marksGot);
        });
      }


  evalQuiz() {
    console.log(this.questions);
    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      

     
      // this._login.getCurrentUser().subscribe((data:any)=>{
      //   this.resultData.user=data;
      // });
      //this.resultData.quiz=this.qid;



      this.resultData.attempted=data.attempted;
     this.resultData.correctAnswers=data.correctAnswers;
      this.resultData.marksGot=data.marksGot;

      
        
        this.resultData.qAttempt++;
  
      console.log(this.resultData);
      console.log("Component "+JSON.stringify(this.resultData));
      this._login.addResult(this.resultData).subscribe((data:any)=>{
        
      });
     
      this.isSubmit=true;
    },(error)=>{
      console.log(error);
    });
   
  }


  showResultPage(){
    this._start.getAttemptsByUser(this.qid,this.resultData.user.id).subscribe((data:any)=>{
      
     
      this.marksGot=data[0].marksGot;
      this.correctAnswers=data[0].correctAnswers;
      this.attempted=data[0].attempted;
      this.isSubmit=true;
      console.log(this.marksGot);
    });
  }

  



}
