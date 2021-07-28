import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDetailsDialogComponent } from './po-details-dialog.component';

describe('PoDetailsDialogComponent', () => {
  let component: PoDetailsDialogComponent;
  let fixture: ComponentFixture<PoDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
