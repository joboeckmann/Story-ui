import { Component, OnChanges, Input, Inject, OnInit } from '@angular/core';
import { Story } from '../../core/models/story';
import { Genre } from '../../core/models/genre';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-stories',
  templateUrl: './edit-stories.component.html',
  styleUrls: ['./edit-stories.component.css']
})
export class EditStoriesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  story: Story;
   genres: Genre[];
  currentGenre: Genre;
  file: Blob
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3001/upload'});

  ngOnInit() {
    this.story=this.data.story;
    this.genres=this.data.genres;
    this.currentGenre = this.genres.find(g=>g.id == this.story.genreId);
  }

}
