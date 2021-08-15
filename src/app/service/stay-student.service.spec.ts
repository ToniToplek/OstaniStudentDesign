import { TestBed } from '@angular/core/testing';

import { StayStudentService } from './stay-student.service';

describe('StayStudentService', () => {
  let service: StayStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StayStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
