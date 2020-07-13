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
      <v-btn dark fab x-small v-bind="attrs" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { XDirection, YDirection } from './type'

@Component
export default class MessageSnackbar extends Vue {
  color = ''
  mode = ''
  visible = false
  text = 'Hello, I\'m a snackbar'
  timeout = 3000
  x: XDirection = XDirection.RIGHT
  y: YDirection = YDirection.TOP
  verticalOffset = 0
  close!: Function

  get positionStyle () {
    return {
      top: `${this.verticalOffset}px`
    }
  }

  handleAfterLeave () {
    console.log('hi')
  }

  mounted () {
    setTimeout(() => {
      this.$destroy()
      document.body.removeChild(this.$el)
    }, this.timeout - 1)
  }

  destroyed () {
    if (typeof this.close === 'function') {
      this.close()
    }
  }
}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>
