import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayStudentAdminComponent } from './stay-student-admin.component';

describe('StayStudentAdminComponent', () => {
  let component: StayStudentAdminComponent;
  let fixture: ComponentFixture<StayStudentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayStudentAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayStudentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
