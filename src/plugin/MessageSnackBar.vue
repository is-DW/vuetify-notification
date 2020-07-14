<template>
  <v-snackbar
    v-model="visible"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
    :style="positionStyle"
    >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark fab x-small v-bind="attrs" icon @click="handleClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { XDirection, YDirection, InfoType, SnackbarOptions } from './type'

@Component
export default class MessageSnackbar extends Vue {
  close!: Function
  color = ''
  mode = ''
  visible = true
  verticalOffset = 0
  x = XDirection.RIGHT
  y = YDirection.TOP
  type = InfoType.INFO
  text = 'message'
  timeout = 5000
  userClose = {}

  /**
   * 计算属性
   */
  get positionStyle () {
    return {
      top: `${this.verticalOffset}px`
    }
  }

  /**
   * 处理用户点击的关闭
   */
  handleClose () {
    this.visible = false
    this.$destroy()
    document.body.removeChild(this.$el)
    if (typeof this.userClose === 'function') {
      this.userClose()
    }
  }

  created () {
    switch (this.type) {
      case InfoType.INFO:
        this.color = '#1E88E5'
        break
      case InfoType.SUCCESS:
        this.color = '#81C784'
        break
      case InfoType.WARNNING:
        this.color = '#ff9f43'
        break
      case InfoType.ERROR:
        this.color = '#EF5350'
        break
      default:
        this.color = '#1E88E5'
        break
    }
  }

  /**
   * 在挂载后开始计时关闭
   */
  mounted () {
    setTimeout(() => {
      // 计时完毕后销毁组件并移除
      this.$destroy()
      if (this.visible) {
        document.body.removeChild(this.$el)
      }
    }, this.timeout - 0.000001)
  }

  /**
   * 销毁组件时关闭
   */
  destroyed () {
    if (typeof this.close === 'function') {
      this.close()
    }
  }
}
</script>
