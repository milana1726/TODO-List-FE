export interface DialogData {
  type: 'delete' | 'edit';
  title: string;
  message?: string;
  value?: string;
  confirmText?: string;
}
