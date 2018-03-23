import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginModule } from './login/login.module';
import { RouterModule, Routes, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { BasePageComponent } from './base-page/base-page/base-page.component';
import { ListStoriesComponent } from './stories/list-stories/list-stories.component';
import { UserResolver } from './core/resolver/userResolver.service';
import { ListCritiquesComponent } from './base-page/list-critiques/list-critiques.component';
import { ListReviewsComponent } from './base-page/list-reviews/list-reviews.component';
import { ListMessagesComponent } from './base-page/list-messages/list-messages.component';
import { MatExpansionModule, MatButtonModule, MatDividerModule, MatListModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChapterService } from './core/services/chapter.service';
import { StoryService } from './core/services/story.service';
import { AuthService } from './core/services/auth.service';
import { CallbackComponent } from './base-page/callback/callback.component';
import { EditStoriesComponent } from './stories/edit-stories/edit-stories.component';
import { StoriesContainerComponent } from './stories/stories-container/stories-container.component';
import { GeneralService } from './core/services/general.service';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

const appRoutes: Routes = [

  {
    path: '',
    component: BasePageComponent,
    resolve: {
      User: UserResolver
    },
    children: [
      {
        path: 'stories',
        component: StoriesContainerComponent
      },
      {
        path: 'critiques',
        component: ListCritiquesComponent
      },
      {
        path: 'reviews',
        component: ListReviewsComponent
      },
      {
        path: 'messages',
        component: ListMessagesComponent
      },
      {
        path: '',
        redirectTo: '/stories',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BasePageComponent,
    ListStoriesComponent,
    ListCritiquesComponent,
    FileSelectDirective,
    CallbackComponent,
    ListReviewsComponent,
    ListMessagesComponent,
    EditStoriesComponent,
    StoriesContainerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatListModule,
    LoginModule,
    RouterModule

  ],
  entryComponents: [
    EditStoriesComponent
  ],
  providers: [UserResolver, ChapterService, GeneralService, StoryService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
