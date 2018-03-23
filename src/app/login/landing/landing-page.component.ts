import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingComponent implements OnInit {
  constructor( private router: Router, public authService: AuthService) {
  }


  ngOnInit() {
  }

  onSubmit() {

  }

  LogIn(){

  }
}


