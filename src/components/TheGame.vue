<template>
  <div class="card-group">
    <TheCard
      v-for="queen in displayedCards"
      :key="queen"
      :queen="queen"
      :flipped="true"
      :matched="true"
    />
  </div>
</template>

<script>
import TheCard from "../components/TheCard";
const requireImages = require.context(`../assets/cards`, false, /\.jpeg$/);

const QUEEN_NAMES = requireImages.keys().map(path =>
  path
    .split("/")
    .pop()
    .replace(/\.\w+$/, ``)
);

export default {
  name: "TheGame",
  components: { TheCard },
  data: function() {
    return {
      queens: QUEEN_NAMES,
      level: "Hard",
      levels: [
        { level: "Hard", length: QUEEN_NAMES ? QUEEN_NAMES.lengths : 1 },
        { level: "Medium", length: 10 },
        { level: "Easy", length: 5 }
      ]
    };
  },
  methods: {
    shuffle: function(array) {
      const shuffled = array.sort(function(a, b) {
        return 0.5 - Math.random();
      });
      return Object.values(shuffled);
    }
  },
  computed: {
    gameSize: function() {
      return this.levels.find(l => this.level === l["level"])["length"];
    },
    queensInGame: function() {
      return this.shuffle(this.queens).slice(0, this.gameSize);
    },
    displayedCards: function() {
      const doubled = [...this.queensInGame, ...this.queensInGame];
      return this.shuffle(doubled);
    }
  }
};
</script>

<style>
.scene {
  height: 100px;
  width: auto;
  perspective: 700px;
  margin: 10px;
}
.card-group {
  display: grid;
  grid-template-rows: repeat(30, 110px);
  grid-template-columns: repeat(3, 1fr);
}
@media (min-width: 770px) {
  .card {
    padding-top: 33.3%;
  }
  .scene {
    width: auto;
    perspective: 800px;
  }
  .card-group {
    grid-template-rows: repeat(30, 180px);
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1000px) {
  .card-group {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (min-width: 1100px) {
  .card-group {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (min-width: 1400px) {
  .card-group {
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
