import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledOdabiraComponent } from './pregled-odabira.component';

describe('PregledOdabiraComponent', () => {
  let component: PregledOdabiraComponent;
  let fixture: ComponentFixture<PregledOdabiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledOdabiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledOdabiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
