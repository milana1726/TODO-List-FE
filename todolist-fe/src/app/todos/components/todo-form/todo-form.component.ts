import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  public form: FormGroup;
  public errorMessage = signal('');
  @Output() addTodo = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
    merge(
      this.form.controls['message'].statusChanges,
      this.form.controls['message'].valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  get messageControl() {
    return this.form.get('message');
  }

  public updateErrorMessage(): void {
    if (this.messageControl?.hasError('required')) {
      this.errorMessage.set('Please enter a message');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {
    const value = this.messageControl?.value;
    if (!value) {
      this.messageControl?.setErrors({ required: true });
    } else {
      this.addTodo.emit(value);
      this.form.reset();
      this.messageControl.setErrors(null);
    }
  }
}
