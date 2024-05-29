import type { App } from 'vue'
import * as ConfirmDialog from 'vuejs-confirm-dialog'

export default function (app: App) {
  app.use(ConfirmDialog)
}
