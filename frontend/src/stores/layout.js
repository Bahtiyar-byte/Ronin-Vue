import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: true,

    /* Aside */
    isAsideExpanded: false,
  }),
  actions: {
    asideToggle (payload = null) {
      // const isShow = payload !== null ? payload : !this.isAsideExpanded

      // document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')
      //
      // document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      this.isAsideExpanded = payload !== null ? payload : !this.isAsideExpanded
    },

    fullScreenToggle (payload) {
      this.isFullScreen = payload

      document.documentElement.classList[payload ? 'add' : 'remove']('full-screen')
    },
  }
})
