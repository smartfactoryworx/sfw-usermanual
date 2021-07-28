import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftPdtBreaksComponent } from './shift-pdt-breaks.component';

describe('ShiftPdtBreaksComponent', () => {
  let component: ShiftPdtBreaksComponent;
  let fixture: ComponentFixture<ShiftPdtBreaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftPdtBreaksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftPdtBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
