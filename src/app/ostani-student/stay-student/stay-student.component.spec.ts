import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayStudentComponent } from './stay-student.component';

describe('StayStudentComponent', () => {
  let component: StayStudentComponent;
  let fixture: ComponentFixture<StayStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
