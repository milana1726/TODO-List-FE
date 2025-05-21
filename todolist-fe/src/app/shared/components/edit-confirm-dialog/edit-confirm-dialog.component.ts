import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

import { DialogData } from '../../models/interfaces/dialog-data';

@Component({
  selector: 'app-edit-confirm-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './edit-confirm-dialog.component.html',
  styleUrl: './edit-confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditConfirmDialogComponent {
  readonly updateMessageControl = new FormControl('', Validators.required);
  readonly dialogRef = inject(MatDialogRef<EditConfirmDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  public errorMessage = signal('');

  constructor() {
    merge(
      this.updateMessageControl.statusChanges,
      this.updateMessageControl.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    if (this.data.type === 'edit') {
      this.updateMessageControl.setValue(this.data.value || '');
    }
  }

  public updateErrorMessage(): void {
    if (this.updateMessageControl.hasError('required')) {
      this.errorMessage.set('Please enter a message');
    } else {
      this.errorMessage.set('');
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onConfirm() {
    const result =
      this.data.type === 'edit' ? this.updateMessageControl.value : true;
    this.dialogRef.close(result);
  }
}
