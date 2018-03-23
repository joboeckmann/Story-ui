import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LandingComponent } from './landing/landing-page.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login',
    component: LandingComponent
  }
];
@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    RouterModule.forChild(
      appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule

  ]
})
export class LoginModule { }
