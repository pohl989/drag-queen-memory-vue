<template>
  <div class="card-group">
    <TheCard v-for="queen in displayedCards" :key="queen" :queen="queen" />
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-group {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
}
</style>
