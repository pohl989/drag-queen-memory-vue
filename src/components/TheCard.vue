<template>
  <div class="card">
    <h3>QUEEN: {{ queen }}</h3>
  </div>
</template>

<script>
export default {
  name: `TheCard`,
  props: {
    queen: { type: String, required: true }
  }
};
</script>

<style></style>
