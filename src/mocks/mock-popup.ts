import { DialogOptions } from 'src/app/shared/models';

/**
 * Mocks methods of the `PopupService`.
 */
export class MockPopupService {
  /**
   * Displays a confirmation dialog to the user.
   *
   * @param dialogOptions Options to configure the dialog.
   * @param disableClose Disable close confirm when clicked outside confirm.
   * @returns True if the user confirmed, false otherwise.
   */
  async confirm(dialogOptions: DialogOptions): Promise<boolean> {
    return true;
  }

  /**
   * Displays a snackbar popup at the bottom of the window.
   *
   * @param message The message to display to the user.
   * @param error Whether the snackbar is for an error message. Optional; defaults to `false`, non-error.
   * @param duration Whether the snackbar is for an error message. Optional; defaults to `false`, non-error.
   */
  notify(message: string, error = false): void {
    return;
  }
}
