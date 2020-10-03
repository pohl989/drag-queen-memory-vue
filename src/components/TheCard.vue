<template>
  <div class="card">
    <div class="img-c">
      <img alt="Vue logo" :src="imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
  name: `TheCard`,
  props: {
    queen: { type: String, required: true }
  },
  computed: {
    imgSrc: function() {
      return require(`../assets/cards/${this.queen}.jpeg`);
    }
  }
};
</script>

<style scoped>
.img-c img {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.card {
  padding: 1rem;
  width: 200px;
  height: auto;
}

.card.correct {
  cursor: auto;
  border: 1px solid #1e1e1e;
  box-shadow: inset 0 0 20px rgba(30, 30, 30, 0.9);
}
</style>
