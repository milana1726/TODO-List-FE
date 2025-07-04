import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  openFailureSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['red-snackbar'],
    });
  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1800,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['green-snackbar'],
    });
  }
}
