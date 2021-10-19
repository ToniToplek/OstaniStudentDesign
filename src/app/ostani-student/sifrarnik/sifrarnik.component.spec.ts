import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifrarnikComponent } from './sifrarnik.component';

describe('SifrarnikComponent', () => {
  let component: SifrarnikComponent;
  let fixture: ComponentFixture<SifrarnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifrarnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifrarnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
