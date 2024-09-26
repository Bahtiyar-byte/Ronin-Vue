export interface IDeletionDialogOptions {
  visible: boolean
  onAccept: () => Promise<void>
}
