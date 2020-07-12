import component from './SnackbarNotify.vue'
import {
  mergeOptions
} from './plugin_helper'

let $vm

const plugin = {
  install (vue, option = {}) {
    // try avoid  [Vuetify] Unable to locate target [data-app]
    // document.body.setAttribute('data-app', true);
    const MSnackBar = vue.extend(component)
    // 初始化,单独地挂载组件到文档内
    if (!$vm) {
      $vm = new MSnackBar({
        // el: document.createElement('div'),
        vuetify: option.vuetify || {},
        propsData: {
          text: 'snackbar'
        }
      })
    }

    const msnackbar = {
      show (options) {
        if (typeof options === 'object') {
          mergeOptions($vm, options)
        }
        this.$watcher && this.$watcher() // 执行原本watch
        this.$watcher = $vm.$watch('showValue', (val) => {
          if (!val && option && option.onHide && typeof option.onHide === 'function') {
            $vm.showValue = false
            option.onHide()
          }
        })
        $vm.showValue = true
      },
      hide () {
        $vm.showValue = false
      },
      isVisible () {
        return $vm.showValue
      }
    }

    // all vn's plugins are included in this.$vn
    if (!vue.$vn) {
      vue.$vn = {
        MSnackbar: msnackbar
      }
    } else {
      vue.$vn.MSnackbar = msnackbar
    }

    vue.mixin({
      created: function () {
        this.$vn = vue.$vn
      },
      mounted () {
        // 渲染完毕再添加到文档流
        // document.querySelector("#app").appendChild($vm.$el)
        // 或者，在文档之外渲染并且随后挂载
        const component = $vm.$mount()
        document.querySelector('#app').appendChild(component.$el)
      }
    })
  }
}
export default plugin
export const install = plugin.install
