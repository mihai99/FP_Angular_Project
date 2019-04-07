import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InUseListComponent } from './in-use-list.component';

describe('InUseListComponent', () => {
  let component: InUseListComponent;
  let fixture: ComponentFixture<InUseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InUseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InUseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
