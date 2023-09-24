import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogOptions } from '../../models';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  /** The title to display for the dialog. */
  title: string;

  /** The message to display in the dialog. */
  message: string;

  /** The text to display for the okay button. */
  okButtonText: string;

  /** The text to display for the cancel button. */
  cancelButtonText: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOptions) {
    this.title = data.title;
    this.message = data.message;
    this.okButtonText = data.okButtonText ? data.okButtonText : 'Si';
    this.cancelButtonText = data.cancelButtonText
      ? data.cancelButtonText
      : 'Cancelar';
  }
}
