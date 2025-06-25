import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmDialogComponent } from './edit-confirm-dialog.component';

describe('EditConfirmDialogComponent', () => {
  let component: EditConfirmDialogComponent;
  let fixture: ComponentFixture<EditConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConfirmDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
