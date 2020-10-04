<template>
  <div class="card">
    <!-- <img alt="Queen" :src="imgSrc" /> -->
    <div
      class="card-image img-c"
      :style="{ backgroundImage: `url(${this.backgroundImage})` }"
    >
      <p class="success-label">Matched</p>
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
    },
    backgroundImage: function() {
      return require(`../assets/cards/${this.queen}.jpeg`);
    }
  }
};
</script>

<style scoped>
.card-image {
  height: 200px;
  width: auto;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
}
.img-c {
  border: 2px solid hsl(330deg 19% 78% / 60%);
  margin: 5px;
  border-radius: 1rem;
}

.card-image > .success-label {
  z-index: 5;
  color: #dce82b;
  background-color: hsl(330deg 19% 60% / 50%);
  width: 100%;
  font-weight: 600;
  border-top: 2px solid hsl(330deg 19% 78% / 60%);
  border-bottom: 2px solid hsl(330deg 19% 78% / 60%);
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
