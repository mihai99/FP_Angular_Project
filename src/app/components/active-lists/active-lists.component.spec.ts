import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveListsComponent } from './active-lists.component';

describe('ActiveListsComponent', () => {
  let component: ActiveListsComponent;
  let fixture: ComponentFixture<ActiveListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
