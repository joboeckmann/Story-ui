import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Genre } from '../models/genre';
 
@Injectable()
export class GeneralService {
   constructor(private http: Http, private authService: AuthService) {
   }
  
 
   getGenres(): Observable<Genre[]> {
     
      return this.http.get(`/api/general/genre`,
       {  headers: new Headers({'Authorization': `Bearer ${this.authService.accessToken}`})})
        .map((res: Response) => res.json())
         .catch((error: any) =>  Observable.throw( error));

   }

}