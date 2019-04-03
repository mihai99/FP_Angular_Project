import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedListsComponent } from './liked-lists.component';

describe('LikedListsComponent', () => {
  let component: LikedListsComponent;
  let fixture: ComponentFixture<LikedListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
