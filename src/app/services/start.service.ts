import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  constructor(private http:HttpClient) { }
  public addResult(resultData:any){
    return this.http.post(baseUrl+'/result/exam',resultData);
  }

  public getAttempts(quid:any){
    return this.http.get(baseUrl+'/result/'+quid);
  }

  public getAttemptsByUserAndQuiz(quid:any,id:any){
    return this.http.get(baseUrl+'/result/'+quid+'/'+id);
  }

  public getAttemptsByUser(id:any){
    return this.http.get(baseUrl+'/result/user/'+id);
  }

}
