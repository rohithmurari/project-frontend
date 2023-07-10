import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionOfQuiz(quid: any){
    return this._http.get(baseUrl+'/question/quiz/all/'+quid);
  }

  public getQuestionOfQuizForTest(quid: any){
    return this._http.get(baseUrl+'/question/quiz/'+quid);
  }

  public addQuestion(question:any){
    return this._http.post(baseUrl+'/question/',question);
  }

  public deleteQuestion(questionId:any){
    return this._http.delete(baseUrl+'/question/'+questionId);
  }

  public updateQuestion(question:any){
    return this._http.put(baseUrl+'/question/',question);
  }

  public getOneQuestionOfQuiz(quesid: any){
    return this._http.get(baseUrl+'/question/'+quesid);
  }

  public evalQuiz(questions:any){
    return this._http.post(baseUrl+'/question/eval-quiz',questions);
  }

  public uploadQuestion(formData:any){
    return this._http.post(baseUrl+'/question/upload',formData);
  }
}
