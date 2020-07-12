<template>
  <v-snackbar
    v-model="showValue"
    :bottom="y === 'bottom'"
    :color="color"
    :left="x === 'left'"
    :multi-line="mode === 'multi-line'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    :vertical="mode === 'vertical'"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="showValue = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

enum XDirection {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

enum YDirection {
  TOP = 'top',
  BOTTOM = 'bottom'
}

@Component
export default class HelloWorld extends Vue {
  color = ''
  mode = ''
  showValue = false
  text = 'Hello, I\'m a snackbar'
  timeout = 6000
  x: XDirection = XDirection.RIGHT
  y: YDirection = YDirection.TOP
}
</script>
