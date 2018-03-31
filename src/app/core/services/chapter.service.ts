import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Chapter } from '../models/chapter';
import { AuthService } from './auth.service';


 
@Injectable()
export class ChapterService {
   constructor(private http: Http, private authService: AuthService) {
   }

   getChapters(userId:number,storyId:number): Observable<Chapter[]> {
        return this.http.get(`/api/user/${userId}/story/${storyId}/chapter`,
          {  headers: new Headers({'Authorization': `Bearer ${this.authService.accessToken}`})})
        .map((res: Response) => res.json())
         .catch((error: any) =>  Observable.throw( error));

   }

}