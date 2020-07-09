<template>
  <v-snackbar
    v-model="snackbar"
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
        @click="snackbar = false"
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
  color: string = ''
  mode: string = ''
  snackbar: boolean = false,
  text: string = 'Hello, I\'m a snackbar'
  timeout: number = 6000
  x: XDirection = XDirection.RIGHT
  y: YDirection = YDirection.TOP
}
</script>
