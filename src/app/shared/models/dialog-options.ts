/**
 * Represents all options to configure a dialog.
 */
export interface DialogOptions {
  /** The title to be displayed on the dialog. */
  title: string;

  /** The message text to be displayed on the dialog. */
  message: string;

  /** The text to display for the okay/confirm/dismiss button. */
  okButtonText?: string;

  /** The text to display for the cancel button. */
  cancelButtonText?: string;

  /** The width of dialog. */
  width?: string;
}
