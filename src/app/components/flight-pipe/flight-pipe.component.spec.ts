import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPipe } from './flight-pipe.component';

describe('FilterPipe', () => {
  let component: FilterPipe;
  let fixture: ComponentFixture<FilterPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
