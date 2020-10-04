<template>
  <div class="scene">
    <div class="card" :class="{ 'is-flipped': showImage }" @click="toggle">
      <div
        class="card__face card__face--front"
        :class="{ matched: matched }"
        :style="{
          backgroundImage: `url(${this.backgroundImage})`
        }"
      >
        <p class="success-label">Matched</p>
      </div>
      <div
        class="card__face card__face--back"
        :style="{
          transform: `rotate(${randomNumber}deg) translate(${randomNumber}px, ${randomNumber}px) rotateY(180deg)`
        }"
      ></div>
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
    matched: { type: Boolean, required: true }
  },
  methods: {
    toggle: function() {
      this.showImage = !this.showImage;
    }
  },
  computed: {
    randomNumber: function() {
      return Math.floor(Math.random() * (8 - -8 + 1) + -8);
    },
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
.scene {
  perspective: 100px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card__face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.card__face--front {
  background: red;
}

.card__face--back {
  background: blue;
  transform: rotateY(180deg);
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card {
  transform-origin: center right;
}

.card.is-flipped {
  transform: translateX(-100%) rotateY(-180deg);
}

.card__face:hover,
.card__face:focus {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transform: scale(1.05);
}

.card-back {
  background-color: pink;
}

.card__face {
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  border: 2px solid hsl(330deg 19% 78% / 60%);
  margin: 5px;
  border-radius: 1rem;
  cursor: pointer;
}

.card__face--front {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}

.card__face--front > .success-label {
  z-index: 5;
  color: #dce82b;
  background-color: hsl(330deg 19% 60% / 50%);
  width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
  border-top: 2px solid hsl(330deg 19% 78% / 60%);
  border-bottom: 2px solid hsl(330deg 19% 78% / 60%);
}

.card.correct {
  cursor: auto;
  border: 1px solid #1e1e1e;
  box-shadow: inset 0 0 20px rgba(30, 30, 30, 0.9);
}
</style>
