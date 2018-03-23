import { Component, OnInit } from '@angular/core';
import { Story } from '../../core/models/story';
import { StoryService } from '../../core/services/story.service';
import { ChapterService } from '../../core/services/chapter.service';
import { AuthService } from '../../core/services/auth.service';
import { GeneralService } from '../../core/services/general.service';
import { Genre } from '../../core/models/genre';
import { EditStoriesComponent } from '../edit-stories/edit-stories.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-stories-container',
  templateUrl: './stories-container.component.html',
  styleUrls: ['./stories-container.component.css']
})
export class StoriesContainerComponent implements OnInit {

  stories: Story[];
  genres:Genre[];

  
  constructor(private storyService: StoryService, 
              private chapterService: ChapterService, 
              private authService: AuthService,
              private generalService: GeneralService,
              public dialog: MatDialog
            ) { }

  ngOnInit() {
    this.generalService.getGenres().subscribe(genres=> this.genres=genres);

    this.authService.userId.subscribe(id =>{
      if (id){
        this.storyService.getStories(id).subscribe(storyList=>{
          this.stories=storyList;
          for ( let story of this.stories ){
          this.chapterService.getChapters(id,story.id).subscribe(chapters =>{
            story.chapters = chapters;
          });
        }
        })
      }
      });
  }

  clickEdit(story:Story){
      let dialogRef = this.dialog.open(EditStoriesComponent, {
        width: '600px',
        data: { story: story, genres: this.genres }
      });

  }


}
