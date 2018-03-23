import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCritiquesComponent } from './list-critiques.component';

describe('ListCritiquesComponent', () => {
  let component: ListCritiquesComponent;
  let fixture: ComponentFixture<ListCritiquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCritiquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCritiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
