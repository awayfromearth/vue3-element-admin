<script setup lang="ts">
import axios from 'axios'

axios('/api/hello_world').then(({ data }) => {
  console.log(data)
})
</script>

<template>
  <SvgIcon icon-class="brand" color="red" size="20px" />
  <div class="testBg"></div>
</template>

<style scoped>
.testBg {
  width: 100px;
  height: 100px;
  background-color: var(--menuBg);
}
</style>
