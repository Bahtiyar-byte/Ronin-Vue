import type { App } from 'vue'
import { createHead } from '@unhead/vue'

export default function (app: App) {
  const head = createHead()

  app.use(head)
}
