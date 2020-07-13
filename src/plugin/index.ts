import Vue from 'vue'
import MessageSnackBar from './MessageSnackBar.vue'
import vuetify from '../plugins/vuetify'
import { SnackbarOptions } from './type'

let instance: any
const instances: any = []
let seedId = 1

function MessageClose (id: any, userOnClose: any) {
  const len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.firstElementChild.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    dom.style.top = parseInt(dom.style.top, 10) - removedHeight - 5 + 'px'
  }
}

/**
 * create a new instance and mount it
 * @param options SnackbarOptions
 */
function Message (options: SnackbarOptions) {
  const userOnClose = options.close
  const id = `message_${seedId++}`
  options.close = function () {
    MessageClose(id, userOnClose)
  }
  instance = new MessageSnackBar({
    vuetify: vuetify || {},
    data: options
  })
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)

  let verticalOffset = 0
  instances.forEach((item: any) => {
    verticalOffset += item.$el.firstElementChild.offsetHeight + 5
  })
  instance.verticalOffset = verticalOffset

  instances.push(instance)
}

function install (vue: any) {
  if (!vue.$VuetifyMessage) {
    vue.prototype.$VuetifyMessage = Message
  }
}
export default install
