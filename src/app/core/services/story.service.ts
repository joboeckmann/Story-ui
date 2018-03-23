import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Story } from '../models/story';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
 
@Injectable()
export class StoryService {
   constructor(private http: Http, private authService: AuthService) {
   }
  
 
   getStories(userid:number): Observable<Story[]> {
     
      return this.http.get(`/api/user/${userid}/story`,
       {  headers: new Headers({'Authorization': `Bearer ${this.authService.accessToken}`})})
        .map((res: Response) => res.json())
         .catch((error: any) =>  Observable.throw( error));

   }

}