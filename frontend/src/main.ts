import './style.css'

import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue/client'
import { headSymbol, type VueHeadClient } from '@unhead/vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { installRouteHead, routes } from './router'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    let head = ctx.app._context.provides[headSymbol] as VueHeadClient | undefined
    if (!head) {
      head = createHead()
      ctx.app.use(head)
    }

    ctx.app.use(vuetify)

    ctx.head = head
    if (ctx.router) {
      installRouteHead(ctx.router, head)
    }
  }
)
