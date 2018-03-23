import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../services/auth.service";

@Injectable()
export class UserResolver implements Resolve<number> {
    token: string;
    constructor( private router: Router, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {

        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/login']);
            return null;
        }

        
         return Observable.of(1);

    }

}