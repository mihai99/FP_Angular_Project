import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastListsComponent } from './last-lists.component';

describe('LastListsComponent', () => {
  let component: LastListsComponent;
  let fixture: ComponentFixture<LastListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
