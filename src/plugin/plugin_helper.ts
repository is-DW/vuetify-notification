import { Component } from 'vue'
import { SnackbarOptions } from './type'

/**
 * merge vue component and its options
 * @param $vm VueComponent
 * @param options some options can customized
 */
const mergeOptions = function ($vm: Component, options: SnackbarOptions) {
  console.log($vm)
  const defaults = {}
  for (const i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default
    }
  }
  const _options = Object.assign({}, defaults, options)
  for (const i in _options) {
    $vm[i] = _options[i]
  }
}

export {
  mergeOptions
}
