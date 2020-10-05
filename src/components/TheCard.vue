<template>
  <div class="scene">
    <div
      class="card"
      :class="{ 'is-flipped': !flipped, 'game-over': gameOver }"
      @click="cardClicked"
    >
      <div
        class="card-face card-face--front"
        :class="{ matched: matched && !gameOver }"
        :style="{
          backgroundImage: `url(${this.backgroundImage})`
        }"
      >
        <p v-if="matched" class="success-label">Matched</p>
      </div>
      <div
        class="card-face card-face--back"
        :style="{
          transform: `rotate(${randomNumber()}deg) translate(${randomNumber()}px, ${randomNumber()}px) rotateY(180deg)`
        }"
      >
        <div>
          <img v-if="!flipped" :src="logoImage" class="card-logo" />
        </div>
        <p v-if="!flipped">Pohlfolio</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `TheCard`,
  data: function() {
    return {
      showImage: true
    };
  },
  props: {
    queen: { type: String, required: true },
    flipped: { type: Boolean, required: true },
    matched: { type: Boolean, required: true },
    id: { type: String, required: true },
    gameOver: { type: Boolean }
  },
  methods: {
    toggle: function() {
      this.showImage = !this.showImage;
    },
    cardClicked() {
      return this.$emit("card-click", {
        name: this.queen,
        flipped: this.flipped,
        matched: this.matched,
        id: this.id
      });
    },
    randomNumber: function() {
      //used so every time the card flips it lays slightly random
      return Math.floor(Math.random() * (8 - -8 + 1) + -8);
    }
  },
  computed: {
    imgSrc: function() {
      return require(`../assets/cards/${this.queen}.jpeg`);
    },
    logoImage: function() {
      return require(`../../public/logo.png`);
    },
    backgroundImage: function() {
      return require(`../assets/cards/${this.queen}.jpeg`);
    }
  }
};
</script>

<style scoped>
.scene {
  perspective: 100px;
}

.card {
  width: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform-origin: center right;
}
.card.game-over {
  animation: spin 15s 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  45% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg) scale(1.1, 1.1);
  }
  55% {
    transform: rotate(360deg);
  }
  60% {
    transform: rotate(360deg) scale(0.9, 0.9);
  }
  65% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.card-face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.card-face--front {
  background: pink;
}

.card-face.card-face--back {
  background: #b78a93;
  transform: rotateY(180deg);
  justify-content: center;
  align-content: center;
  flex-direction: column;
  cursor: pointer;
}
.card-face--back p {
  margin: 5px;
  font-family: "Caveat", serif;
  color: #dce82b;
  font-size: 1.5rem;
  user-select: none;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-logo {
  height: 50px;
  width: auto;
}

.card.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}

.card-face:hover,
.card-face:focus {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transform: scale(1.1, 1.1);
}

.card-face {
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  border: 2px solid hsl(330deg 19% 78% / 60%);
  margin: 5px;
  border-radius: 1rem;
}

.card-face--front {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-color: #dce82b;
  color: #dce82b;
}

.card-face--front > .success-label {
  z-index: 5;
  font-family: "Caveat", serif;
  color: #dce82b;
  background-color: hsl(330deg 19% 60% / 70%);
  width: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  border-top: 2px solid hsl(330deg 19% 78% / 60%);
  border-bottom: 2px solid hsl(330deg 19% 78% / 60%);
}

.matched {
  filter: grayscale(100%);
  cursor: default;
}

.card.correct {
  cursor: auto;
  border: 1px solid #1e1e1e;
  box-shadow: inset 0 0 20px rgba(30, 30, 30, 0.9);
}
</style>
