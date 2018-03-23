import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Story } from '../../core/models/story';



@Component({
  selector: 'app-list-stories',
  templateUrl: './list-stories.component.html',
  styleUrls: ['./list-stories.component.css']
})
export class ListStoriesComponent implements OnChanges {

  @Input() stories: Story[];
  @Output() clickEdit: EventEmitter<Story>= new EventEmitter<Story>();

  constructor() { }

ngOnChanges() {
 
}

editClicked(story:Story){
  this.clickEdit.emit(story);

}

}
