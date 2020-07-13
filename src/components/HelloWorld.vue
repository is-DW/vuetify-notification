<template>
  <div>hello</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  count = 10
  created () {
    setInterval(() => {
      if (this.count > 0) {
        this.$VuetifyMessage({ visible: true, text: `数字${this.count}` })
        this.count--
      }
    }, 200)
  }
}
</script>
