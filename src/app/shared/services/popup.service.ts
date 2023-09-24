import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogOptions } from '../models';
import { firstValueFrom } from 'rxjs';
import { DialogComponent } from '../ui/dialog/dialog.component';

/** Max width dialogs. */
const MAX_WIDTH = '1200px';

/** Default width dialog. */
const DIALOG_WIDTH = '500px';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Displays a confirmation dialog to the user.
   *
   * @param dialogOptions Options to configure the dialog.
   * @param disableClose Disable close confirm when clicked outside confirm.
   * @returns True if the user confirmed, false otherwise.
   */
  async confirm(
    dialogOptions: DialogOptions,
    disableClose = false
  ): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: MAX_WIDTH,
      width: dialogOptions.width ? dialogOptions.width : DIALOG_WIDTH,
      data: dialogOptions,
      disableClose,
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }

  /**
   * Displays a snackbar popup at the bottom of the window.
   *
   * @param message The message to display to the user.
   * @param error Whether the snackbar is for an error message. Optional; defaults to `false`, non-error.
   * @param duration Whether the snackbar is for an error message. Optional; defaults to `false`, non-error.
   */
  notify(message: string, error = false, duration?: number): void {
    this.snackBar.open(message, 'X', {
      duration: duration || 3500,
      panelClass: error ? 'snackbar-error' : 'snackbar', // see in styles.scss
    });
  }
}
